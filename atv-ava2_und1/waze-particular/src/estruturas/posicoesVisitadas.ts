import type { PosicaoVisitada } from "../tipos/posicaoVisitada";

export class PosicoesVisitadas {
    private posicoes: PosicaoVisitada[] = [];
    private quantidadePosicoes: number = 0;

    public adicionar(posicao: PosicaoVisitada): void {
        this.posicoes[this.quantidadePosicoes] = posicao;
        this.quantidadePosicoes++;
    }

    public estaVisitado(
        x: number,
        y: number
    ): boolean {
        for (
            let indice = 0;
            indice < this.quantidadePosicoes;
            indice++
        ) {
            if (
                this.posicoes[indice].posicao.x === x &&
                this.posicoes[indice].posicao.y === y
            ) {
                return this.posicoes[indice].visitada;
            }
        }

        return false;
    }

    public obterPosicao(
        x: number,
        y: number
    ): PosicaoVisitada | null {
        for (
            let indice = 0;
            indice < this.quantidadePosicoes;
            indice++
        ) {
            if (
                this.posicoes[indice].posicao.x === x &&
                this.posicoes[indice].posicao.y === y
            ) {
                return this.posicoes[indice];
            }
        }

        return null;
    }

    public obterQuantidade(): number {
        return this.quantidadePosicoes;
    }
}
