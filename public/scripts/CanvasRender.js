class CanvasRender{
    constructor(width, height){
        this.width = width
        this.height = height

        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        
        this.canvas.width = this.width
        this.canvas.height = this.height


        document.querySelector('#app').appendChild(this.canvas)
    }

    reset(){
        this.context.clearRect(0, 0, this.width, this.height)
    }

    draw(drawFn){
        drawFn(this.context)
    }

    static initialize(){
        const canvasRender = new CanvasRender(1365, 638)

        canvasRender.draw(() => {})

        return canvasRender
    }
    
}

 
export default CanvasRender