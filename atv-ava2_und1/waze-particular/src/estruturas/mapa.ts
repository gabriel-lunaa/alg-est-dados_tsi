import type { PontoMapa } from "../tipos/pontoMapa";
import type { Conexao } from "../tipos/conexao";

export class Mapa {
    private pontos: PontoMapa[] = [];
    private conexoes: Conexao[] = [];

    private quantidadePontos: number = 0;
    private quantidadeConexoes: number = 0;

    public adicionarPonto(ponto: PontoMapa): void {
        this.pontos[this.quantidadePontos] = ponto;
        this.quantidadePontos++;
    }

    public adicionarConexao(conexao: Conexao): void {
        this.conexoes[this.quantidadeConexoes] = conexao;
        this.quantidadeConexoes++;
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
}
