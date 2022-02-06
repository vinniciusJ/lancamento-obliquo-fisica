//Criar maneira de receber os valores pelo terminal
const readline = require('readline') 
const LancamentoObliquo = require('./equations')

function imprimirResultados(lancamentoObliquo){
    const resultado = `
        \nDados informados: \n
        Ângulo do lançamento: ${lancamentoObliquo.angulo}°\n
        Velocidade de Inicial: ${lancamentoObliquo.velocidadeInicial}m/s\n
        \n Resultado do lançamento oblíquo: \n
        Altura máx. alcançada: ${lancamentoObliquo.getAlturaMax()}m\n
        Tempo de subida: ${lancamentoObliquo.getTempoDeSubida()}s\n
        Tempo de voo: ${lancamentoObliquo.getTempoDeVoo()}s\n
        Distância percorrida: ${lancamentoObliquo.getDistanciaPercorrida()}m
    `

    console.log(resultado)
}

const leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let lancamentoObliquo = new LancamentoObliquo()

leitor.question('Informe o ângulo do lançamento: ', function(angulo){
    leitor.question('Informe a velocidade inicial em m/s: ', function(velocidadeInicial){
        lancamentoObliquo = new LancamentoObliquo(angulo, velocidadeInicial)

        imprimirResultados(lancamentoObliquo)

        leitor.close()
    })
})



