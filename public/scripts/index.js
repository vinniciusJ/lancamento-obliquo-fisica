import CanvasRender from './CanvasRender.js'
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

const canvasRender = CanvasRender.initialize()

const showProjectileTrajectory = ({ x, y }) => canvasRender.draw(context => {
    context.beginPath();
    context.arc(x, y, 5, 0, Math.PI * 2);
    context.closePath();
    context.fill();
})

const showCoordsAtTime = (projectileMotion, time) => canvasRender.draw(context => {
    const speedData = projectileMotion.getSpeedAtTime(time)
    const positionData = projectileMotion.getPositionAtTime(time)

    const text = `
    vx: ${speedData.vx.toFixed(2)} \n
    vy: ${speedData.vy.toFixed(2)} \n
    x: ${positionData.x.toFixed(2)} \n
    y: ${positionData.y.toFixed(2)} \n
    t: ${time}
    `
    
    context.font = '15px Ubuntu'
    context.fillStyle = 'red'
    context.textAlign = 'left'
    context.fillText(text, positionData.x * 10, (canvasRender.height - 100) - (positionData.y * 10))
})

const createProjectileTrajectory = (projectileMotion, time = 0) => {
    const interval = setInterval(() => {
        const data = projectileMotion.getPositionAtTime(time)
        const rectCoords = { x: data.x * 10, y: ((canvasRender.height - 100) - (data.y * 10)) }

        if(!!data.time){
            showCoordsAtTime(projectileMotion, time)
        }

        showProjectileTrajectory(rectCoords)

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

    setTimeout(() => clearInterval(interval), projectileMotion.getFlightTime() * 1000)
})

cleanButton.addEventListener('click', () => canvasRender.reset())