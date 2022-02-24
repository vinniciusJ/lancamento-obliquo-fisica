class LancamentoObliquo{
    constructor(angulo, velocidadeInicial, xInicial, yInicial){
        this.angulo = angulo
        this.velocidadeInicial = velocidadeInicial
        this.xInicial = xInicial
        this.yInicial = yInicial

        this.velocidadeInicialY = this.velocidadeInicial * Math.sin(angulo * (Math.PI / 180)) // voy = vo * sen(α)
        this.velocidadeX = this.velocidadeInicial * Math.cos(angulo * (Math.PI / 180)) //vx = vo * cos(α)

        this.velocidadeY = this.velocidadeInicialY
    }

    static GRAVIDADE = 9.81 // Para usar a constante gravidade, referenciamos da seguinte forma: LancamentoObliquo.GRAVIDADE

    getAlturaMax(){
        const alturaMax = (this.velocidadeInicialY ** 2) / (2 * LancamentoObliquo.GRAVIDADE)

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
        const distanciaPercorrida = this.velocidadeX * this.getTempoDeVoo()

        return distanciaPercorrida
    }

    calcularPosicaoX(tempo){
        tempo -= this.getTempoDeVoo()

        console.log(`
            xInicial: ${this.xInicial},
            velocidadeX: ${this.velocidadeX},
            tempo: ${tempo},
            posicaoX: ${this.xInicial + this.velocidadeX * tempo}
        `)
        

        return this.xInicial + this.velocidadeX * tempo
    }

    calcularPosicaoY(tempo){
        tempo -= this.getTempoDeVoo()

        const yAtual =  this.yInicial - this.velocidadeY * tempo + (LancamentoObliquo.GRAVIDADE * (tempo ** 2 ) / 2)
    

        return yAtual
    }

}

export default LancamentoObliquo // exportando a classe LancamentoObliquo