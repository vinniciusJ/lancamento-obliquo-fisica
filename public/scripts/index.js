import CanvasRender from './CanvasRender.js'
import ProjectileMotion from './equation.js'

const startButton = document.querySelector('.shoot-button')
const angleInput = document.querySelector('#input-angle')
const initialSpeedInput = document.querySelector("#input-v0")

const canvasRender = CanvasRender.initialize()

startButton.addEventListener('click', event => {
    const angle = angleInput.value
    const initialSpeed = initialSpeedInput.value

    const projectileMotion = new ProjectileMotion(30, 30, { x: 0, y: 0 })

    let time = 0

    const interval = setInterval(() => {
        const { x, y } = projectileMotion.getPositionAtTime(time)
        
        const rectCoords = { x: x, y: (canvasRender.height - y)}


        console.table({ x, y })

        canvasRender.draw(context => {
            context.fillStyle = '#000'
            context.fillRect(rectCoords.x, rectCoords.y, 10, 10)
        })

        time++
    }, 1000)   

})

startButton.click()