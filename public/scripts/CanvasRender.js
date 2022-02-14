class CanvasRender{
    constructor(width, height){
        this.width = width
        this.height = height

        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')

        this.canvas.width = this.width
        this.canvas.height = this.height

        const background = new Image()

        background.src = './images/background.png'

        background.addEventListener('load', () => {
            this.context.drawImage(background, 0, 0)
        })

        document.querySelector('#app').appendChild(this.canvas)
    }

    reset(){
        this.context.clearRect(0, 0, this.width, this.height)
    }

    draw(){
        this.context.fillStyle = '#F9DC5C';
        this.context.fillRect(100, 100, 150, 100);
    
    }

    static initialize(){
        const canvasRender = new CanvasRender(1440, 820)

        canvasRender.draw()
    }
}

 
export default CanvasRender