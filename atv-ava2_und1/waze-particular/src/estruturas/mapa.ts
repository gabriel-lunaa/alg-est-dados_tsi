import type { Endereco } from "../tipos/endereco";
import type { Rua } from "../tipos/rua";
import type { TabuleiroMapa } from "./tabuleiroMapa";
import type { PontoMapa } from "../tipos/pontoMapa";
import type { Conexao, NivelTransito } from "../tipos/conexao";

export class Mapa {
    private pontos: PontoMapa[] = [];
    private conexoes: Conexao[] = [];

    private ruas: Rua[] = [];
    private enderecos: Endereco[] = [];

    private tabuleiro: TabuleiroMapa | null = null;

    private quantidadePontos: number = 0;
    private quantidadeConexoes: number = 0;
    private quantidadeRuas: number = 0;
    private quantidadeEnderecos: number = 0;

    public adicionarPonto(ponto: PontoMapa): void {
        this.pontos[this.quantidadePontos] = ponto;
        this.quantidadePontos++;
    }

    public buscarPontoPorId(id: number): PontoMapa | null {
        for (let indice = 0; indice < this.quantidadePontos; indice++) {
            if (this.pontos[indice].id === id) {
                return this.pontos[indice];
            }
        }

        return null;
    }

    public buscarPontoPorPosicao(x: number, y: number): PontoMapa | null {
        for (let indice = 0; indice < this.quantidadePontos; indice++) {
            if (
                this.pontos[indice].posicao.x === x &&
                this.pontos[indice].posicao.y === y
            ) {
                return this.pontos[indice];
            }
        }

        return null;
    }

        public buscarPontoPorEndereco(
            nomeRua: string,
            numero: number
        ): PontoMapa | null {
            for (
                let indice = 0;
                indice < this.quantidadePontos;
                indice++
            ) {
                const ponto = this.pontos[indice];

                if (
                    ponto.endereco.nomeRua === nomeRua &&
                    ponto.endereco.numero === numero
                ) {
                    return ponto;
                }
            }

            return null;
        }

            public adicionarRua(rua: Rua): void {
                this.ruas[this.quantidadeRuas] = rua;
                this.quantidadeRuas++;
            }

            public obterRua(indice: number): Rua {
                return this.ruas[indice];
            }

            public obterQuantidadeRuas(): number {
                return this.quantidadeRuas;
            }

            public adicionarConexao(conexao: Conexao): void {
                this.conexoes[this.quantidadeConexoes] = conexao;
                this.quantidadeConexoes++;
            }

    public alterarTransitoConexao(
        indiceConexao: number,
        nivelTransito: NivelTransito
    ): boolean {
        if (
            indiceConexao < 0 ||
            indiceConexao >= this.quantidadeConexoes
        ) {
            return false;
        }

        this.conexoes[indiceConexao].nivelTransito = nivelTransito;

        return true;
    }

    public definirTabuleiro(tabuleiro: TabuleiroMapa): void {
        this.tabuleiro = tabuleiro;
    }

    public obterTabuleiro(): TabuleiroMapa | null {
        return this.tabuleiro;
    }

    public obterPonto(indice: number): PontoMapa {
        return this.pontos[indice];
    }

    public obterConexao(indice: number): Conexao {
        return this.conexoes[indice];
    }

        public obterQuantidadePontos(): number {
        return this.quantidadePontos;
    }

    public obterQuantidadeConexoes(): number {
        return this.quantidadeConexoes;
    }

    public adicionarEndereco(endereco: Endereco): void {
        this.enderecos[this.quantidadeEnderecos] = endereco;
        this.quantidadeEnderecos++;
    }

    public buscarEndereco(
        nomeRua: string,
        numero: number
    ): Endereco | null {
        for (
            let indice = 0;
            indice < this.quantidadeEnderecos;
            indice++
        ) {
            const endereco = this.enderecos[indice];

            if (
                endereco.nomeRua === nomeRua &&
                endereco.numero === numero
            ) {
                return endereco;
            }
        }

        return null;
    }

    public obterEndereco(indice: number): Endereco {
        return this.enderecos[indice];
    }

    public obterQuantidadeEnderecos(): number {
        return this.quantidadeEnderecos;
    }
}
