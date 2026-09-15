import { Fila } from "../estruturas/fila";
import { PosicoesVisitadas } from "../estruturas/posicoesVisitadas";
import type { TabuleiroMapa } from "../estruturas/tabuleiroMapa";
import type { Posicao } from "../tipos/posicao";
import type { ElementoFila } from "../tipos/elementoFila";
import type { PosicaoVisitada } from "../tipos/posicaoVisitada";

export class BuscaEmLargura {
    public encontrarCaminho(
        tabuleiro: TabuleiroMapa,
        origem: Posicao,
        destino: Posicao
    ): Posicao[] {
        const fila = new Fila();
        const posicoesVisitadas =
            new PosicoesVisitadas();

        const primeiraPosicao: PosicaoVisitada = {
            posicao: origem,
            visitada: true,
            posicaoAnterior: null
        };

        posicoesVisitadas.adicionar(
            primeiraPosicao
        );

        fila.adicionar({
            posicao: origem
        });

        while (!fila.estaVazia()) {
            const elementoAtual =
                fila.remover();

            if (elementoAtual === null) {
                break;
            }

            const posicaoAtual =
                elementoAtual.posicao;

            if (
                posicaoAtual.x === destino.x &&
                posicaoAtual.y === destino.y
            ) {
                return this.reconstruirCaminho(
                    posicoesVisitadas,
                    origem,
                    destino
                );
            }

            const vizinhos =
                this.obterVizinhos(
                    tabuleiro,
                    posicaoAtual
                );

            for (
                let indice = 0;
                indice < 4;
                indice++
            ) {
                const vizinho =
                    vizinhos[indice];

                if (vizinho === null) {
                    continue;
                }

                if (
                    posicoesVisitadas.estaVisitado(
                        vizinho.x,
                        vizinho.y
                    )
                ) {
                    continue;
                }

                const posicaoVisitada: PosicaoVisitada = {
                    posicao: vizinho,
                    visitada: true,
                    posicaoAnterior: posicaoAtual
                };

                posicoesVisitadas.adicionar(
                    posicaoVisitada
                );

                const novoElemento: ElementoFila = {
                    posicao: vizinho
                };

                fila.adicionar(novoElemento);
            }
        }

        return [];
    }

    private obterVizinhos(
        tabuleiro: TabuleiroMapa,
        posicao: Posicao
    ): (Posicao | null)[] {
        const vizinhos: (Posicao | null)[] = [
            null,
            null,
            null,
            null
        ];

        const deslocamentosX: number[] = [
            0,
            1,
            0,
            -1
        ];

        const deslocamentosY: number[] = [
            -1,
            0,
            1,
            0
        ];

        let quantidadeVizinhos = 0;

        for (
            let indice = 0;
            indice < 4;
            indice++
        ) {
            const x =
                posicao.x +
                deslocamentosX[indice];

            const y =
                posicao.y +
                deslocamentosY[indice];

            const celula =
                tabuleiro.obterCelula(x, y);

            if (celula === null) {
                continue;
            }

            if (!celula.transitavel) {
                continue;
            }

            vizinhos[quantidadeVizinhos] = {
                x: x,
                y: y
            };

            quantidadeVizinhos++;
        }

        return vizinhos;
    }

    private reconstruirCaminho(
        posicoesVisitadas: PosicoesVisitadas,
        origem: Posicao,
        destino: Posicao
    ): Posicao[] {
        const caminho: Posicao[] = [];
        let quantidadeCaminho = 0;

        let posicaoAtual: Posicao | null = destino;

        while (posicaoAtual !== null) {
            caminho[quantidadeCaminho] =
                posicaoAtual;

            quantidadeCaminho++;

            if (
                posicaoAtual.x === origem.x &&
                posicaoAtual.y === origem.y
            ) {
                break;
            }

            const posicaoVisitada =
                posicoesVisitadas.obterPosicao(
                    posicaoAtual.x,
                    posicaoAtual.y
                );

            if (posicaoVisitada === null) {
                return [];
            }

            posicaoAtual =
                posicaoVisitada.posicaoAnterior;
        }

        const caminhoInvertido: Posicao[] = [];

        for (
            let indice = 0;
            indice < quantidadeCaminho;
            indice++
        ) {
            caminhoInvertido[indice] =
                caminho[
                    quantidadeCaminho -
                    1 -
                    indice
                ];
        }

        return caminhoInvertido;
    }
}