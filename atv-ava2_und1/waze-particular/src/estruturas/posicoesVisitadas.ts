import type { PosicaoVisitada } from "../tipos/posicaoVisitada";

export class PosicoesVisitadas {
    private posicoes: PosicaoVisitada[] = [];
    private quantidadePosicoes: number = 0;

    public adicionar(posicao: PosicaoVisitada): void {
        this.posicoes[this.quantidadePosicoes] = posicao;
        this.quantidadePosicoes++;
    }

    public estaVisitado(idPonto: number): boolean {
        for (let indice = 0; indice < this.quantidadePosicoes; indice++) {
            if (this.posicoes[indice].ponto.id === idPonto) {
                return this.posicoes[indice].visitada;
            }
        }

        return false;
    }

    public obterPosicao(indice: number): PosicaoVisitada {
        return this.posicoes[indice];
    }

    public obterQuantidade(): number {
        return this.quantidadePosicoes;
    }
}