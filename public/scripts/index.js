import CanvasRenderer, { colorSchema } from './CanvasRender.js'
import ProjectileMotion from './ProjectileMotion.js'

const startButton = document.querySelector('.shoot-button')
const cleanButton = document.querySelector('.clean-button')

const angleInput = document.querySelector('#input-angle')
const initialSpeedInput = document.querySelector("#input-v0")
const gravityInput = document.querySelector('.contexts')

const resultLabels = {
    maxHeight: document.querySelector('#max-height'),
    maxDistance: document.querySelector('#max-distance'),
    flightTime: document.querySelector('#flight-time')
}

const propsByTimeContainer = {
    scrollableArea: document.querySelector('.scroll-container'),
    content: document.querySelector('.info-time')
}

const speedLabels = {
    vx: document.querySelector('#vx-arrow'),
    v0y: document.querySelector('#v0y-arrow')
}

const gravities = { '9.81': 'earth', '1.62': 'moon', '24.79': 'jupter' }

let currentGravity = '9.81'
let currentColorSchema = colorSchema[gravities[currentGravity]]

const launchedProjectiles = []

const canvasRenderer = CanvasRenderer.initialize()

const showProjectileTrajectory = ({ x, y }, { style   }) => {
    canvasRenderer.draw(context => {
        context.fillStyle = style 
        context.strokeStyle = style

        context.beginPath();
        context.arc(x, y, 2.5, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    })
}
 
const showProjectileParable = ({ sx, sy, ex, ey }, { style  }) => {
    canvasRenderer.draw(context => {
        context.fillStyle = style 
        context.strokeStyle = style
        
        context.beginPath()
        context.moveTo(sx, sy)
        context.lineTo(ex, ey)
        context.stroke()
    })
}

const showTrajectory = (coords) => {
    coords.map(coord => {
        const { sx, sy, ex: x, ey: y } = coord

        showProjectileParable({ sx, sy, ex: x, ey: y }, { style: currentColorSchema.primary })
        showProjectileTrajectory({ x, y }, { style: currentColorSchema.primary  })
    })
}

const showProjectile = ({ x, y }, { style }) => {
    canvasRenderer.draw(context => {
        context.fillStyle = style 
        context.strokeStyle = style

        context.beginPath();
        context.arc(x, y, 17, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    })
}

const showAllLaunchedProjectiles = () => {
    launchedProjectiles.map(projectileCoords => {
        projectileCoords.map(({ sx, sy, ex, ey }, index) => {
            showProjectileParable({ sx, sy, ex, ey }, { style: currentColorSchema.secondary  })
            showProjectileTrajectory({ x: ex, y: ey }, { style: currentColorSchema.secondary })

            if(projectileCoords.length - 1 == index){
                showProjectile({ x: ex, y: ey }, { style: currentColorSchema.secondary })
            }
        })
    })
}

const showProjectileAtLastPosition = projectileMotion => {
    const trajectoryCoords = [...JSON.parse(localStorage.getItem('current-trajectory-coords'))]
    const lastCoord = trajectoryCoords.at(-1)
    
    const data = projectileMotion.getPositionAtTime(projectileMotion.getFlightTime(), { finalTime: true })
    const rectCoords = { x: data.x * 15, y: ((canvasRenderer.height - 90) - (data.y * 15)) }

    const currentTrajectory = {
        sx: lastCoord.ex,
        sy: lastCoord.ey,
        ex: rectCoords.x,
        ey: rectCoords.y
    }

    canvasRenderer.clear({ x: (currentTrajectory.sx - 17), y: (currentTrajectory.sy - 17), width: 34, height: 34 })

    trajectoryCoords.push(currentTrajectory)

    if(!!launchedProjectiles.length){
        showAllLaunchedProjectiles()
    }

    showTrajectory(trajectoryCoords)
    showProjectile(rectCoords, { style: currentColorSchema.primary }) 

    localStorage.setItem('current-trajectory-coords', JSON.stringify(trajectoryCoords))
}

const showPropsPerSecond = (x, y, vx, vy, time) => {
    propsByTimeContainer.content.style.display = 'block'

    propsByTimeContainer.scrollableArea.innerHTML += `<div class="time">
        <div class="time-title">Tempo: <span class="time-name">${time / 10}</span>s</div>
        <p></p><strong>X:</strong> <span class="time-X">${x.toFixed(2)}</span> metros</p>
        <p></p><strong>Y:</strong> <span class="time-Y">${y.toFixed(2)}</span> metros</p>
        <p></p><strong>Vx:</strong> <span class="time-Vx">${vx.toFixed(2)}</span> m/s</p>
        <p></p><strong>Vy:</strong> <span class="time-Vy">${vy.toFixed(2)}</span> m/s</p>
        </div>
    `
}

const cleanPropsOfLastTrajectory = () => {
    propsByTimeContainer.scrollableArea.innerHTML = ''
}

const hideTimePropsCard = () => {
    propsByTimeContainer.content.style.display = 'none'
}

const createProjectileTrajectory = (projectileMotion, time = 0) => {
    const coords = [{ x: 0, y: canvasRenderer.height - 90 }]
    const trajectoryCoords = [ ]

    const interval = setInterval(() => {
        const data = projectileMotion.getPositionAtTime(time + 1)
        const rectCoords = { x: data.x * 15, y: ((canvasRenderer.height - 90) - (data.y * 15)) }

        if(Number.isInteger((time + 1) / 10)) {
            const { x, y } = data
            const { vx, vy} = projectileMotion.getSpeedAtTime(time + 1)

            showPropsPerSecond(x, y, vx, vy, time + 1)
        }

        const currentTrajectory = {
            sx: coords[time].x,
            sy: coords[time].y,
            ex: rectCoords.x,
            ey: rectCoords.y
        }

        trajectoryCoords.push(currentTrajectory)
        coords.push(rectCoords)

        canvasRenderer.reset()

        if(!!launchedProjectiles.length){
            showAllLaunchedProjectiles()
        }

        showTrajectory(trajectoryCoords)
        showProjectile(rectCoords, { style: currentColorSchema.primary }) 

        localStorage.setItem('current-trajectory-coords', JSON.stringify(trajectoryCoords))

        time++
    }, 100)

    return interval
}

const showResults = projectileMotion => {
    resultLabels.maxHeight.textContent = projectileMotion.getMaxHeight().toFixed(2)
    resultLabels.maxDistance.textContent = projectileMotion.getMaxDistance().toFixed(2)
    resultLabels.flightTime.textContent = projectileMotion.getFlightTime().toFixed(2)

    speedLabels.vx.textContent = projectileMotion.xInitialSpeed.toFixed(2)
    speedLabels.v0y.textContent = projectileMotion.yInitialSpeed.toFixed(2)
}

const resetLabels = () => {
    const labels = { ...speedLabels, ...resultLabels }

    Object.keys(labels).map(key => {
        labels[key].textContent = 0
    })
}

const updateBg = bgName => {
    canvasRenderer.canvas.style.background = `url('images/${bgName}.png')`
}

startButton.addEventListener('click', event => {
    const angle = angleInput.value
    const initialSpeed = initialSpeedInput.value

    const projectileMotion = new ProjectileMotion(angle, initialSpeed, currentGravity)

    cleanPropsOfLastTrajectory()
    showResults(projectileMotion)

    const animation = createProjectileTrajectory(projectileMotion)

    startButton.disabled = true

    setTimeout(() => {
        showProjectileAtLastPosition(projectileMotion)

        startButton.disabled = false
        launchedProjectiles.push(JSON.parse(localStorage.getItem('current-trajectory-coords')))

        clearInterval(animation)
    }, projectileMotion.getFlightTime() * 1000)
})

cleanButton.addEventListener('click', () => {
    launchedProjectiles.length = 0

    canvasRenderer.reset()

    resetLabels()
    hideTimePropsCard()
})

gravityInput.addEventListener('change', () => {
    currentGravity = gravityInput.options[gravityInput.selectedIndex].value
    currentColorSchema = colorSchema[gravities[currentGravity]]
    
    launchedProjectiles.length = 0

    canvasRenderer.reset()

    updateBg(currentGravity)
})