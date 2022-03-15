export const CANVAS_WIDTH = 1365
export const CANVAS_HEIGHT = 638
/*
export const colorSchema = {
    earth: {
        primary: '#F78154',
        secondary: '#424340'
    },
    moon: {
        primary: '#F78154',
        secondary: '#FFF'
    },
    jupter: {
        primary: '#F78154',
        secondary: '#FFF'
    }
}*/
class CanvasRenderer{
    constructor(width, height){
        this.width = width
        this.height = height

        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        
        this.canvas.width = this.width
        this.canvas.height = this.height

        this.context.translate(120, 0)

        this.context.fillStyle = '#000'
        this.context.strokeStyle = '#000'

        document.querySelector('#app').appendChild(this.canvas)
    }

    clear({ x, y, width, height }){
        this.context.clearRect(x, y, width, height)
    }

    reset(){
        this.context.clearRect(0, 0, this.width, this.height)
    }

    draw(drawFn){
        drawFn(this.context)
    }

    static initialize(){
        return new CanvasRenderer(CANVAS_WIDTH, CANVAS_HEIGHT)
    }
    
}


export default CanvasRenderer