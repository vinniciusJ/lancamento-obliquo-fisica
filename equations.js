class LancamentoObliquo{
    angulo = 0
    velocidadeInicial = 0
    velocidadeInicialY = 0
    velocidadeX = 0

    constructor(angulo, velocidadeInicial){
        this.angulo = angulo
        this.velocidadeInicial = velocidadeInicial
        
        this.velocidadeInicialY = this.velocidadeInicial * Math.sin(angulo * (Math.PI / 180)) // voy = vo * sen(α)
        this.velocidadeX = this.velocidadeInicial * Math.cos(angulo * (Math.PI / 180)) //vx = vo * cos(α)
    }

    static GRAVIDADE = 9.81 // Para usar a constante gravidade, referenciamos da seguinte forma: LancamentoObliquo.GRAVIDADE

    getAlturaMax(){
        const alturaMax = ((this.velocidadeInicialY ** 2) / (2 * LancamentoObliquo.GRAVIDADE)).toFixed(2)

        return alturaMax
    }

    getTempoDeSubida(){ 
        const tempoDeSubida = (this.velocidadeInicialY / LancamentoObliquo.GRAVIDADE).toFixed(2) 

        return tempoDeSubida 
    }

    getTempoDeVoo(){
        const tempoDeVoo = (parseFloat(this.getTempoDeSubida()) * 2).toFixed(2)

        return tempoDeVoo
    }

    getDistanciaPercorrida(){
        // equação

        return 0// resultado da equação
    }

}

module.exports = LancamentoObliquo // exportando a classe LancamentoObliquo