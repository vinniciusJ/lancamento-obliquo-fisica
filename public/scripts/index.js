import CanvasRender from './CanvasRender.js'
import ProjectileMotion from './equation.js'

const startButton = document.querySelector('.shoot-button')
const angleInput = document.querySelector('#input-angle')
const initialSpeedInput = document.querySelector("#input-v0")

const canvasRender = CanvasRender.initialize()

startButton.addEventListener('click', event => {
    const angle = angleInput.value
    const initialSpeed = initialSpeedInput.value

    const projectileMotion = new ProjectileMotion(angle, initialSpeed, { x: 50, y: 0 })

    let time = 0

    const interval = setInterval(() => {
        const { x, y } = projectileMotion.getPositionAtTime(time)
        
        const rectCoords = { x: x * 10, y: (canvasRender.height - (y * 10))}


        console.table([
            (rectCoords.x * 10), (rectCoords.y * 10)
        ])

        canvasRender.draw(context => {
            context.beginPath();
            context.arc(rectCoords.x, rectCoords.y, 10, 0, Math.PI * 2);
            context.closePath();
            context.fill();
        })

        time++
    }, 1000)   

})