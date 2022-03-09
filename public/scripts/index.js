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

const drawProjectileParable = ({ sx, sy, ex, ey }) => canvasRender.draw(context => {
    context.beginPath()
    context.moveTo(sx, sy)
    context.lineTo(ex, ey)
    context.stroke()
})

const createProjectileTrajectory = (projectileMotion, time = 0) => {
    const points = [{ x: 0, y: 538 }]

    const interval = setInterval(() => {
        const data = projectileMotion.getPositionAtTime(time + 1)
        const rectCoords = { x: data.x * 10, y: ((canvasRender.height - 100) - (data.y * 10)) }

        const lineCoords = {
            sx: points[time].x,
            sy: points[time].y,
            ex: rectCoords.x,
            ey: rectCoords.y
        }

        console.table(lineCoords)
        //showProjectileTrajectory(rectCoords)
        drawProjectileParable(lineCoords)

        points.push(rectCoords)

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