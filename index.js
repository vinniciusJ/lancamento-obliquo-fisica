const readline = require('readline') 
// Importando a biblioteca para poder fazer a leitura dos dados recebidos pelo terminal ↑
const LancamentoObliquo = require('./equations') 
// Importando a classe Lancamento Obliquo com todos os metódos necessairos ↑

function imprimirResultados(lancamentoObliquo){
    const resultado = `
        \nDados informados: \n
        Ângulo do lançamento: ${lancamentoObliquo.angulo}°\n
        Velocidade de Inicial: ${lancamentoObliquo.velocidadeInicial}m/s\n
        \n Resultado do lançamento oblíquo: \n
        Altura máx. alcançada: ${lancamentoObliquo.getAlturaMax().toFixed(2)}m\n
        Tempo de subida: ${lancamentoObliquo.getTempoDeSubida().toFixed(2)}s\n
        Tempo de voo: ${lancamentoObliquo.getTempoDeVoo().toFixed(2)}s\n
        Distância percorrida: ${lancamentoObliquo.getDistanciaPercorrida().toFixed(2)}m
    `

    // String formatada com o resultado do lançamento ↑

    console.log(resultado)
}

const leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Criando a interface que usaremos para receber os dados ↑

let lancamentoObliquo = new LancamentoObliquo()

// Instanciando o objeto de lancamento obliquo somente para ele nao ficar como null ↑

// Essa função de leitura recebe a mensagem a ser mostrada e uma funbção callback - que será executada assim que o usuário pressionar Enter ↓
leitor.question('Informe o ângulo do lançamento: ', function(angulo){ 
    // Pedindo a inserção do primeiro valor (ângulo) ↑

    leitor.question('Informe a velocidade inicial em m/s: ', function(velocidadeInicial){
        lancamentoObliquo = new LancamentoObliquo(angulo, velocidadeInicial)

        // Instanciando o objeto de lancamento obliquo já com os valores passados pelo usuário

        imprimirResultados(lancamentoObliquo)

        leitor.close()
    })
})



