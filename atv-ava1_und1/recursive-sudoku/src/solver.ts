import type {
    Tabuleiro,
    EstatisticasResolucao
} from "./types";

import {
    encontrarCelulaVazia,
    movimentoValido
} from "./sudoku";


// ======================================================
// SOLVER
// ======================================================

export function resolverSudoku(
    tabuleiro: Tabuleiro,
    estatisticas: EstatisticasResolucao,
    profundidade = 0
): boolean {

    // Registra uma chamada recursiva
    estatisticas.chamadasRecursivas++;

    // Registra a maior profundidade alcançada
    if (
        profundidade >
        estatisticas.profundidadeMaxima
    ) {

        estatisticas.profundidadeMaxima =
            profundidade;
    }

    // Procura uma célula vazia
    const celulaVazia =
        encontrarCelulaVazia(tabuleiro);

    // CASO BASE:
    // Não existem mais células vazias.
    if (celulaVazia === null) {
        return true;
    }

    const {
        linha,
        coluna
    } = celulaVazia;


    // Cria uma lista com os números de 1 a 9.
    const numeros = [
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
    ];


    // Embaralha os números.
    // Isso faz com que cada execução
    // possa produzir uma solução diferente.
    for (
        let indice = numeros.length - 1;
        indice > 0;
        indice--
    ) {

        const indiceAleatorio =
            Math.floor(
                Math.random() * (indice + 1)
            );

        [
            numeros[indice],
            numeros[indiceAleatorio]
        ] = [
            numeros[indiceAleatorio],
            numeros[indice]
        ];
    }


    // Tenta os números em ordem aleatória.
    for (const numero of numeros) {

        estatisticas.tentativas++;


        // Verifica se podemos colocar o número.
        if (
            movimentoValido(
                tabuleiro,
                linha,
                coluna,
                numero
            )
        ) {

            // Faz a tentativa.
            tabuleiro[linha][coluna] =
                numero;


            // RECURSIVIDADE
            if (
                resolverSudoku(
                    tabuleiro,
                    estatisticas,
                    profundidade + 1
                )
            ) {

                return true;
            }


            // RETROCEDER
            tabuleiro[linha][coluna] = 0;

            estatisticas.retrocessos++;
        }
    }


    // Nenhum número funcionou.
    return false;
}

// ======================================================
// GERADOR DE SUDOKU
// ======================================================

export type NivelDificuldade =
    "facil" |
    "medio" |
    "dificil";


export function gerarSolucaoSudoku(): Tabuleiro {

    // Cria um tabuleiro completamente vazio.
    const tabuleiro: Tabuleiro = [

        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],

        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],

        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];


    // Estatísticas temporárias.
    const estatisticas: EstatisticasResolucao = {

        chamadasRecursivas: 0,

        tentativas: 0,

        retrocessos: 0,

        profundidadeMaxima: 0
    };


    // Usa o algoritmo recursivo
    // para preencher o tabuleiro.
    resolverSudoku(
        tabuleiro,
        estatisticas
    );


    return tabuleiro;
}


export function gerarTabuleiroSudoku(
    nivel: NivelDificuldade
): {
    tabuleiro: Tabuleiro;
    solucao: Tabuleiro;
} {

    // Gera uma solução completa.
    const solucao =
        gerarSolucaoSudoku();


    // Cria uma cópia da solução.
    const tabuleiro: Tabuleiro =
        solucao.map(
            (linha) => [...linha]
        );


    // Quantidade de células que permanecerão
    // preenchidas inicialmente.
    let quantidadePreenchida: number;

    switch (nivel) {

        case "facil":
            quantidadePreenchida = 45;
            break;

        case "medio":
            quantidadePreenchida = 36;
            break;

        case "dificil":
            quantidadePreenchida = 28;
            break;
    }


    // Cria uma lista com todas as posições.
    const posicoes: {
        linha: number;
        coluna: number;
    }[] = [];


    for (let linha = 0; linha < 9; linha++) {

        for (let coluna = 0; coluna < 9; coluna++) {

            posicoes.push({
                linha,
                coluna
            });
        }
    }


    // Embaralha as posições.
    for (
        let indice = posicoes.length - 1;
        indice > 0;
        indice--
    ) {

        const indiceAleatorio =
            Math.floor(
                Math.random() * (indice + 1)
            );

        [
            posicoes[indice],
            posicoes[indiceAleatorio]
        ] = [
            posicoes[indiceAleatorio],
            posicoes[indice]
        ];
    }


    // Quantidade de células que serão removidas.
    const quantidadeRemover =
        81 - quantidadePreenchida;


    // Remove as células aleatoriamente.
    for (
        let indice = 0;
        indice < quantidadeRemover;
        indice++
    ) {

        const {
            linha,
            coluna
        } = posicoes[indice];

        tabuleiro[linha][coluna] = 0;
    }


    return {
        tabuleiro,
        solucao
    };
}