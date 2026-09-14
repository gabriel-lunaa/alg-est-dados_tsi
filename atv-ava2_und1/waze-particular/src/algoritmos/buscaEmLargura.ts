import type { Mapa } from "../estruturas/mapa";
import type { PontoMapa } from "../tipos/pontoMapa";
import { Fila } from "../estruturas/fila";
import type { ElementoFila } from "../tipos/elementoFila";
import { PosicoesVisitadas } from "../estruturas/posicoesVisitadas";
import type { PosicaoVisitada } from "../tipos/posicaoVisitada";

export class BuscaEmLargura {
    private mapa: Mapa;

    public constructor(mapa: Mapa) {
        this.mapa = mapa;
    }

    public buscar(origem: PontoMapa, destino: PontoMapa): PontoMapa[] {
        const fila = new Fila();
        const posicoesVisitadas = new PosicoesVisitadas();

        const pontoOrigem = this.mapa.buscarPontoPorId(origem.id);
        const pontoDestino = this.mapa.buscarPontoPorId(destino.id);

        const caminho: PontoMapa[] = [];

        if (pontoOrigem === null || pontoDestino === null) {
            return caminho;
        }

        const elementoOrigem: ElementoFila = {
            ponto: pontoOrigem
        };

        const posicaoOrigem: PosicaoVisitada = {
            ponto: pontoOrigem,
            visitada: true,
            pontoAnterior: null
        };

        fila.adicionar(elementoOrigem);
        posicoesVisitadas.adicionar(posicaoOrigem);

        while (!fila.estaVazia()) {
            const elementoAtual = fila.remover();

            if (elementoAtual === null) {
                break;
            }

            const pontoAtual = elementoAtual.ponto;

            if (pontoAtual.id === pontoDestino.id) {
                let pontoCaminho: PontoMapa | null = pontoAtual;
                let quantidadeCaminho = 0;

                while (pontoCaminho !== null) {
                    caminho[quantidadeCaminho] = pontoCaminho;
                    quantidadeCaminho++;

                    const posicaoAtual = this.obterPosicaoVisitada(
                        posicoesVisitadas,
                        pontoCaminho.id
                    );

                    if (posicaoAtual === null) {
                        pontoCaminho = null;
                    } else {
                        pontoCaminho = posicaoAtual.pontoAnterior;
                    }
                }

                this.inverterCaminho(caminho, quantidadeCaminho);

                return caminho;
            }

            for (
                let indiceConexao = 0;
                indiceConexao < this.mapa.obterQuantidadeConexoes();
                indiceConexao++
            ) {
                const conexao = this.mapa.obterConexao(indiceConexao);

                if (
                    conexao.origem.x === pontoAtual.posicao.x &&
                    conexao.origem.y === pontoAtual.posicao.y
                ) {
                    const pontoVizinho = this.mapa.buscarPontoPorPosicao(
                        conexao.destino.x,
                        conexao.destino.y
                    );

                    if (pontoVizinho !== null) {
                        const jaFoiVisitado =
                            posicoesVisitadas.estaVisitado(pontoVizinho.id);

                        if (!jaFoiVisitado) {
                            const posicaoVisitada: PosicaoVisitada = {
                                ponto: pontoVizinho,
                                visitada: true,
                                pontoAnterior: pontoAtual
                            };

                            posicoesVisitadas.adicionar(posicaoVisitada);

                            const elementoFila: ElementoFila = {
                                ponto: pontoVizinho
                            };

                            fila.adicionar(elementoFila);
                        }
                    }
                }
            }
        }

        return caminho;
    }

    private obterPosicaoVisitada(
        posicoesVisitadas: PosicoesVisitadas,
        idPonto: number
    ): PosicaoVisitada | null {
        for (
            let indice = 0;
            indice < posicoesVisitadas.obterQuantidade();
            indice++
        ) {
            const posicaoVisitada =
                posicoesVisitadas.obterPosicao(indice);

            if (posicaoVisitada.ponto.id === idPonto) {
                return posicaoVisitada;
            }
        }

        return null;
    }

    private inverterCaminho(
        caminho: PontoMapa[],
        quantidadeCaminho: number
    ): void {
        let inicio = 0;
        let fim = quantidadeCaminho - 1;

        while (inicio < fim) {
            const pontoTemporario = caminho[inicio];
            caminho[inicio] = caminho[fim];
            caminho[fim] = pontoTemporario;

            inicio++;
            fim--;
        }
    }
}