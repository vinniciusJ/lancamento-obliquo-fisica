import CanvasRender from './CanvasRender.js'
import ProjectileMotion from './equation.js'
import LancamentoObliquo from './LancamentoObliquo.js'

const botaoIniciar = document.querySelector('.shoot-button')
const inputAngulo = document.querySelector('#input-angle')
const inputVelocidadeInicial = document.querySelector("#input-v0")

const canvasRender = CanvasRender.initialize()

botaoIniciar.addEventListener('click', event => {
    const angle = inputAngulo.value
    const velocidadeInicial = inputVelocidadeInicial.value

    const lancamentoObliquo = new ProjectileMotion(angle, velocidadeInicial, { x: 50, y: 500 })

    let controladorTempo = 1

    const interval = setInterval(() => {
        const [ x, y ] = [  
            lancamentoObliquo.getXPositionAt(controladorTempo),
            lancamentoObliquo.getYPositionAt(controladorTempo)
        ]

        //canvasRender.reset()
        
        canvasRender.draw(context => {
            context.fillStyle = '#000'
           /* context.strokeStyle = '#000'
            context.lineWidth = 10

            context.beginPath()
            context.lineTo((x + 50), (y + 50))
            context.moveTo((x + 50), (y + 50))
            context.stroke()*/

            context.fillRect((x + 10), (y + 10), 10, 10)
        })

        //console.log(`{ x: ${x}, y: ${y} }`)

        controladorTempo++

    }, 1000)    
})