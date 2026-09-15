import type { TabuleiroMapa } from "../estruturas/tabuleiroMapa";
import type { Posicao } from "../tipos/posicao";

export class MenorDistancia {
    public calcular(
        tabuleiro: TabuleiroMapa,
        origem: Posicao,
        destino: Posicao
    ): Posicao[] {
        const quantidadeCelulas =
            tabuleiro.obterLargura() *
            tabuleiro.obterAltura();

        const distancias: number[] = [];
        const visitadas: boolean[] = [];
        const posicoesAnteriores: (Posicao | null)[] = [];

        for (
            let indice = 0;
            indice < quantidadeCelulas;
            indice++
        ) {
            distancias[indice] = Infinity;
            visitadas[indice] = false;
            posicoesAnteriores[indice] = null;
        }

        const indiceOrigem =
            this.obterIndice(
                tabuleiro,
                origem
            );

        const indiceDestino =
            this.obterIndice(
                tabuleiro,
                destino
            );

        if (
            indiceOrigem === -1 ||
            indiceDestino === -1
        ) {
            return [];
        }

        const celulaOrigem =
            tabuleiro.obterCelula(
                origem.x,
                origem.y
            );

        const celulaDestino =
            tabuleiro.obterCelula(
                destino.x,
                destino.y
            );

        if (
            celulaOrigem === null ||
            celulaDestino === null
        ) {
            return [];
        }

        if (
            !celulaOrigem.transitavel ||
            !celulaDestino.transitavel
        ) {
            return [];
        }

        distancias[indiceOrigem] = 0;

        for (
            let contador = 0;
            contador < quantidadeCelulas;
            contador++
        ) {
            let indiceMenorDistancia = -1;
            let menorDistancia = Infinity;

            for (
                let indice = 0;
                indice < quantidadeCelulas;
                indice++
            ) {
                if (
                    !visitadas[indice] &&
                    distancias[indice] <
                        menorDistancia
                ) {
                    menorDistancia =
                        distancias[indice];

                    indiceMenorDistancia =
                        indice;
                }
            }

            if (
                indiceMenorDistancia === -1
            ) {
                break;
            }

            visitadas[indiceMenorDistancia] =
                true;

            if (
                indiceMenorDistancia ===
                indiceDestino
            ) {
                break;
            }

            const posicaoAtual =
                this.obterPosicaoPorIndice(
                    tabuleiro,
                    indiceMenorDistancia
                );

            const vizinhos =
                this.obterVizinhos(
                    tabuleiro,
                    posicaoAtual
                );

            for (
                let indiceVizinho = 0;
                indiceVizinho < 4;
                indiceVizinho++
            ) {
                const vizinho =
                    vizinhos[indiceVizinho];

                if (vizinho === null) {
                    continue;
                }

                const indiceVizinhoTabuleiro =
                    this.obterIndice(
                        tabuleiro,
                        vizinho
                    );

                if (
                    indiceVizinhoTabuleiro === -1 ||
                    visitadas[
                        indiceVizinhoTabuleiro
                    ]
                ) {
                    continue;
                }

                const celulaVizinha =
                    tabuleiro.obterCelula(
                        vizinho.x,
                        vizinho.y
                    );

                if (celulaVizinha === null) {
                    continue;
                }

                const fatorTransito =
                    this.obterFatorTransito(
                        celulaVizinha.nivelTransito
                    );

                if (
                    celulaVizinha.nivelTransito === "intenso"
                ) {
                    
                }

                const novaDistancia =
                    distancias[
                        indiceMenorDistancia
                    ] + fatorTransito;

               if (
                    novaDistancia <
                    distancias[
                        indiceVizinhoTabuleiro
                    ]
                ) {
                    if (
                        vizinho.y === 2 &&
                        vizinho.x >= 3
                    ) {
                        
                    }

                    distancias[
                        indiceVizinhoTabuleiro
                    ] = novaDistancia;

                    posicoesAnteriores[
                        indiceVizinhoTabuleiro
                    ] = posicaoAtual;
                }
            }
        }


        if (
            distancias[indiceDestino] ===
            Infinity
        ) {
            return [];
        }

        return this.reconstruirCaminho(
            tabuleiro,
            posicoesAnteriores,
            origem,
            destino
        );
    }

    private obterFatorTransito(
        nivelTransito:
            "livre" |
            "moderado" |
            "intenso" |
            null
    ): number {
        if (nivelTransito === "moderado") {
            return 3;
        }

        if (nivelTransito === "intenso") {
            return 10;
        }

        return 1;
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
                tabuleiro.obterCelula(
                    x,
                    y
                );

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

    private obterIndice(
        tabuleiro: TabuleiroMapa,
        posicao: Posicao
    ): number {
        if (
            posicao.x < 0 ||
            posicao.x >= tabuleiro.obterLargura() ||
            posicao.y < 0 ||
            posicao.y >= tabuleiro.obterAltura()
        ) {
            return -1;
        }

        return (
            posicao.y *
            tabuleiro.obterLargura() +
            posicao.x
        );
    }

    private obterPosicaoPorIndice(
        tabuleiro: TabuleiroMapa,
        indice: number
    ): Posicao {
        const largura =
            tabuleiro.obterLargura();

        return {
            x: indice % largura,
            y: Math.floor(indice / largura)
        };
    }

    private reconstruirCaminho(
        tabuleiro: TabuleiroMapa,
        posicoesAnteriores:
            (Posicao | null)[],
        origem: Posicao,
        destino: Posicao
    ): Posicao[] {
        const caminho: Posicao[] = [];
        let quantidadeCaminho = 0;

        let posicaoAtual:
            Posicao | null = destino;

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

            const indice =
                this.obterIndice(
                    tabuleiro,
                    posicaoAtual
                );

            if (indice === -1) {
                return [];
            }

            posicaoAtual =
                posicoesAnteriores[indice];
        }

        if (
            quantidadeCaminho === 0 ||
            posicaoAtual === null
        ) {
            return [];
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