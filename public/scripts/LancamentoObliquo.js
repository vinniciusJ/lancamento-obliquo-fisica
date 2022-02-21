class LancamentoObliquo{
    angulo = 0
    velocidadeInicial = 0
    velocidadeInicialY = 0
    velocidadeX = 0
    xInicial = 0
    yInicial = 0

    constructor(angulo, velocidadeInicial, xInicial, yInicial){
        this.angulo = angulo
        this.velocidadeInicial = velocidadeInicial
        this.xInicial = xInicial
        this.yInicial = yInicial

        this.velocidadeInicialY = this.velocidadeInicial * Math.sin(angulo * (Math.PI / 180)) // voy = vo * sen(α)
        this.velocidadeX = this.velocidadeInicial * Math.cos(angulo * (Math.PI / 180)) //vx = vo * cos(α)
    }

    static GRAVIDADE = 9.81 // Para usar a constante gravidade, referenciamos da seguinte forma: LancamentoObliquo.GRAVIDADE

    getAlturaMax(){
        const alturaMax = this.yInicial + ((this.velocidadeInicialY ** 2) / (2 * LancamentoObliquo.GRAVIDADE))

        return alturaMax
    }

    getTempoDeSubida(){ 
        const tempoDeSubida = (this.velocidadeInicialY / LancamentoObliquo.GRAVIDADE)

        return tempoDeSubida 
    }

    getTempoDeVoo(){
        const tempoDeVoo = (parseFloat(this.getTempoDeSubida()) * 2)

        return tempoDeVoo
    }

    getDistanciaPercorrida(){
        const distanciaPercorrida = this.xInicial + (this.velocidadeX * this.getTempoDeVoo())

        return distanciaPercorrida
    }

    calculateXPosition(time){
        const x = this.xInicial + this.velocidadeX  * time

        return x
    }

    calculateYPosition(time){
        let y = this.yInicial + (this.velocidadeInicialY * time) + (LancamentoObliquo.GRAVIDADE * (time ** 2) / 2)
        
        return y
    }

}

export default LancamentoObliquo // exportando a classe LancamentoObliquo