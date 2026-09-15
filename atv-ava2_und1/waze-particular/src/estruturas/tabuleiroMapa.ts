import type { CelulaMapa } from "../tipos/celulaMapa";
import type { NivelTransito } from "../tipos/celulaMapa";
import type { PontoMapa } from "../tipos/pontoMapa";

export class TabuleiroMapa {
    private celulas: CelulaMapa[] = [];

    private largura: number;
    private altura: number;

    public constructor(
        largura: number,
        altura: number
    ) {
        this.largura = largura;
        this.altura = altura;

        const quantidadeCelulas =
            largura * altura;

        for (
            let indice = 0;
            indice < quantidadeCelulas;
            indice++
        ) {
            this.celulas[indice] = {
                tipo: "terreno",
                ponto: null,
                transitavel: false,
                nivelTransito: null
            };
        }
    }

    public definirCelula(
        x: number,
        y: number,
        celula: CelulaMapa
    ): void {
        if (
            x < 0 ||
            x >= this.largura ||
            y < 0 ||
            y >= this.altura
        ) {
            return;
        }

        const indice =
            y * this.largura + x;

        this.celulas[indice] = celula;
    }

    public definirTerreno(
        x: number,
        y: number
    ): void {
        if (
            x < 0 ||
            x >= this.largura ||
            y < 0 ||
            y >= this.altura
        ) {
            return;
        }

        const indice =
            y * this.largura + x;

        this.celulas[indice] = {
            tipo: "vazio",
            ponto: null,
            transitavel: false,
            nivelTransito: null
        };
    }

    public definirRua(
        x: number,
        y: number,
        nivelTransito: NivelTransito = "livre"
    ): void {
        if (
            x < 0 ||
            x >= this.largura ||
            y < 0 ||
            y >= this.altura
        ) {
            return;
        }

        const indice =
            y * this.largura + x;

        this.celulas[indice] = {
            tipo: "rua",
            ponto: null,
            transitavel: true,
            nivelTransito: nivelTransito
        };
    }

    public definirCasa(
        x: number,
        y: number
    ): void {
        if (
            x < 0 ||
            x >= this.largura ||
            y < 0 ||
            y >= this.altura
        ) {
            return;
        }

        const indice =
            y * this.largura + x;

        this.celulas[indice] = {
            tipo: "casa",
            ponto: null,
            transitavel: false,
            nivelTransito: null
        };
    }

    public definirPredio(
        x: number,
        y: number
    ): void {
        if (
            x < 0 ||
            x >= this.largura ||
            y < 0 ||
            y >= this.altura
        ) {
            return;
        }

        const indice =
            y * this.largura + x;

        this.celulas[indice] = {
            tipo: "predio",
            ponto: null,
            transitavel: false,
            nivelTransito: null
        };
    }

    public definirPraca(
        x: number,
        y: number
    ): void {
        if (
            x < 0 ||
            x >= this.largura ||
            y < 0 ||
            y >= this.altura
        ) {
            return;
        }

        const indice =
            y * this.largura + x;

        this.celulas[indice] = {
            tipo: "praca",
            ponto: null,
            transitavel: false,
            nivelTransito: null
        };
    }

    public definirEstabelecimento(
        x: number,
        y: number,
        ponto: PontoMapa
    ): void {
        if (
            x < 0 ||
            x >= this.largura ||
            y < 0 ||
            y >= this.altura
        ) {
            return;
        }

        const indice =
            y * this.largura + x;

        this.celulas[indice] = {
            tipo: "estabelecimento",
            ponto: ponto,
            transitavel: false,
            nivelTransito: null
        };
    }

    public alterarTransito(
        x: number,
        y: number,
        nivelTransito: NivelTransito
    ): void {
        if (
            x < 0 ||
            x >= this.largura ||
            y < 0 ||
            y >= this.altura
        ) {
            return;
        }

        const indice =
            y * this.largura + x;

        if (this.celulas[indice].tipo !== "rua") {
            return;
        }

        this.celulas[indice].nivelTransito =
            nivelTransito;
    }

    public obterCelula(
        x: number,
        y: number
    ): CelulaMapa | null {
        if (
            x < 0 ||
            x >= this.largura ||
            y < 0 ||
            y >= this.altura
        ) {
            return null;
        }

        const indice =
            y * this.largura + x;

        return this.celulas[indice];
    }

    public obterLargura(): number {
        return this.largura;
    }

    public obterAltura(): number {
        return this.altura;
    }

    public obterCelulas(): CelulaMapa[] {
        return this.celulas;
    }

    public carregarCelulas(
        celulas: CelulaMapa[]
    ): void {
        const quantidadeCelulas =
            this.largura * this.altura;

        for (
            let indice = 0;
            indice < quantidadeCelulas;
            indice++
        ) {
            this.celulas[indice] =
                celulas[indice];
        }
    }
}
