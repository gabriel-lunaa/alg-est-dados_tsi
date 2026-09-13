import type { PontoMapa } from "../tipos/pontoMapa";

export class Mapa {
    private pontos: PontoMapa[] = [];
    private quantidadePontos: number = 0;

    public adicionarPonto(ponto: PontoMapa): void {
        this.pontos[this.quantidadePontos] = ponto;
        this.quantidadePontos++;
    }

    public obterPonto(indice: number): PontoMapa {
        return this.pontos[indice];
    }

    public obterQuantidadePontos(): number {
        return this.quantidadePontos;
    }
}
