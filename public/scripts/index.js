import CanvasRender from './CanvasRender.js'
import LancamentoObliquo from './LancamentoObliquo.js'

const botaoIniciar = document.querySelector('.shoot-button')
const inputAngulo = document.querySelector('#input-angle')
const inputVelocidadeInicial = document.querySelector("#input-v0")

const canvasRender = CanvasRender.initialize()

botaoIniciar.addEventListener('click', event => {
    const angle = inputAngulo.value
    const velocidadeInicial = inputVelocidadeInicial.value

    const lancamentoObliquo = new LancamentoObliquo(angle, velocidadeInicial, 50, -620)

    let controladorTempo = 0
    const positions = [ [ 50, -620 ] ]

    const interval = setInterval(() => {
        const [ x, y ] = [  
            lancamentoObliquo.calculateXPosition(controladorTempo),
            lancamentoObliquo.calculateYPosition(controladorTempo)
        ]

        //canvasRender.reset()
        
        canvasRender.draw(context => {
            context.fillStyle = '#000'
            context.fillRect(50, 100, 10, 10)
        })

        positions.push([ x, y ])

        controladorTempo++

    }, 1000)

    setTimeout(() => {        
        //clearInterval(interval)

    }, lancamentoObliquo.getTempoDeVoo() * 1000)
    
})