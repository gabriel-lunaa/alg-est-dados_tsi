import type { Tabuleiro, Posicao } from "./types";

export function encontrarCelulaVazia(tabuleiro: Tabuleiro): Posicao | null {
    for (let linha = 0; linha < 9; linha++) {
        for (let coluna = 0; coluna < 9; coluna++) {
            if (tabuleiro[linha][coluna] === 0) {
                return { linha, coluna };
            }
        }
    }

    return null;
}

export function movimentoValido(
    tabuleiro: Tabuleiro,
    linha: number,
    coluna: number,
    numero: number
): boolean {

    // Verifica a linha
    for (let colunaAtual = 0; colunaAtual < 9; colunaAtual++) {
        if (tabuleiro[linha][colunaAtual] === numero) {
            return false;
        }
    }

    // Verifica a coluna
    for (let linhaAtual = 0; linhaAtual < 9; linhaAtual++) {
        if (tabuleiro[linhaAtual][coluna] === numero) {
            return false;
        }
    }

    // Descobre o início do bloco 3x3
    const primeiraLinhaBloco = Math.floor(linha / 3) * 3;
    const primeiraColunaBloco = Math.floor(coluna / 3) * 3;

    // Verifica o bloco 3x3
    for (
        let linhaAtual = primeiraLinhaBloco;
        linhaAtual < primeiraLinhaBloco + 3;
        linhaAtual++
    ) {
        for (
            let colunaAtual = primeiraColunaBloco;
            colunaAtual < primeiraColunaBloco + 3;
            colunaAtual++
        ) {
            if (tabuleiro[linhaAtual][colunaAtual] === numero) {
                return false;
            }
        }
    }

    return true;
}