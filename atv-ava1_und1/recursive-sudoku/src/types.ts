export type Tabuleiro = number[][];

export interface Posicao {
    linha: number;
    coluna: number;
}

export interface EstatisticasResolucao {
    chamadasRecursivas: number;
    tentativas: number;
    retrocessos: number;
    profundidadeMaxima: number;
}