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

    let tempo = 1

    const interval = setInterval(() => {
        
        const [ x, y ] = [  
            lancamentoObliquo.getXPositionAt(tempo),
            lancamentoObliquo.getYPositionAt(tempo)
        ]

        //canvasRender.reset()
        
        canvasRender.draw(context => {
            context.fillStyle = '#000'
            context.fillRect(x, y, 10, 10)
        })

        

        tempo++

    }, 1000)    
})