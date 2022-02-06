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

    static GRAVIDADE = 10 // Para usar a constante gravidade, referenciamos da seguinte forma: LancamentoObliquo.GRAVIDADE

    getAlturaMax(){
        //equação

        return //resultado da equação
    }

    getTempoDeSubida(){
        //equação

        return 0 //resultado da equação
    }

    getTempoDeVoo(){
        // equação

        return 0// resultado da equação
    }

    getDistanciaPercorrida(){
        // equação

        return 0// resultado da equação
    }

}

module.exports = LancamentoObliquo // exportando a classe LancamentoObliquo