export const estadoJogo = {

    acertos: 0,

    erros: 0,

    sudokuConcluido: false,

    ultimaLinhaPreenchida: -1,

    ultimaColunaPreenchida: -1,

    linhasComemoradas: new Set<number>(),

    colunasComemoradas: new Set<number>(),

    blocosComemorados: new Set<string>()

};
