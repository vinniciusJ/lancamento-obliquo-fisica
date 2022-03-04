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

const createProjectileTrajectory = (projectileMotion, time = 0) => {
    const interval = setInterval(() => {
        const coords = projectileMotion.getPositionAtTime(time)
        const rectCoords = { x: coords.x * 10, y: ((canvasRender.height - 100) - (coords.y * 10)) }

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