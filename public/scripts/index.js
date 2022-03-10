import CanvasRenderer from './CanvasRender.js'
import ProjectileMotion from './equation.js'

const startButton = document.querySelector('.shoot-button')
const cleanButton = document.querySelector('.clean-button')

const angleInput = document.querySelector('#input-angle')
const initialSpeedInput = document.querySelector("#input-v0")

const resultLabels = {
    maxHeight: document.querySelector('#max-height'),
    maxDistance: document.querySelector('#max-distance'),
    flightTime: document.querySelector('#flight-time')
}

const canvasRenderer = CanvasRenderer.initialize()

const showProjectileTrajectory = ({ x, y }) => canvasRenderer.draw(context => {
    context.beginPath();
    context.arc(x, y, 2.5, 0, Math.PI * 2);
    context.closePath();
    context.fill();
})
 
const showProjectileParable = ({ sx, sy, ex, ey }) => canvasRenderer.draw(context => {
    context.beginPath()
    context.moveTo(sx, sy)
    context.lineTo(ex, ey)
    context.stroke()
})

const showTrajectory = (coords) => {
    coords.map(coord => {
        const { sx, sy, ex: x, ey: y } = coord

        showProjectileParable({ sx, sy, ex: x, ey: y })
        showProjectileTrajectory({ x, y })
    })
}

const showProjectile = ({ x, y }) => {
    const projectileImage = new Image()

    projectileImage.src = 'images/projectile.png'

    projectileImage.addEventListener('load', event => {
        x -= projectileImage.width / 2
        y -= projectileImage.height / 2

        canvasRenderer.draw(context => {
            context.drawImage(projectileImage, x , y)
        })
    })
}

const createProjectileTrajectory = (projectileMotion, time = 0) => {
    const coords = [{ x: 0, y: canvasRenderer.height - 90 }]
    const trajectoryCoords = [ ]

    const interval = setInterval(() => {
        const data = projectileMotion.getPositionAtTime(time + 1)
        const rectCoords = { x: data.x * 15, y: ((canvasRenderer.height - 90) - (data.y * 15)) }

        const currentTrajectory = {
            sx: coords[time].x,
            sy: coords[time].y,
            ex: rectCoords.x,
            ey: rectCoords.y
        }

        trajectoryCoords.push(currentTrajectory)
        coords.push(rectCoords)

        canvasRenderer.reset()

        showProjectile(rectCoords)
        showTrajectory(trajectoryCoords)

        time++
    }, 100)

    return interval
}

const showResults = projectileMotion => {
    resultLabels.maxHeight.textContent = projectileMotion.getMaxHeight().toFixed(2)
    resultLabels.maxDistance.textContent = projectileMotion.getMaxDistance().toFixed(2)
    resultLabels.flightTime.textContent = projectileMotion.getFlightTime().toFixed(2)
}

startButton.addEventListener('click', event => {
    const angle = angleInput.value
    const initialSpeed = initialSpeedInput.value

    const projectileMotion = new ProjectileMotion(angle, initialSpeed)

    showResults(projectileMotion)

    const interval = createProjectileTrajectory(projectileMotion) 

    startButton.disabled = true

    setTimeout(() => {
        startButton.disabled = false

        clearInterval(interval)
    }, projectileMotion.getFlightTime() * 1000)
})

cleanButton.addEventListener('click', () => canvasRenderer.reset())