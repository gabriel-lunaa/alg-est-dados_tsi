import type { Mapa } from "../estruturas/mapa";
import type { PontoMapa } from "../tipos/pontoMapa";

export class MenorDistancia {
    public calcular(
        mapa: Mapa,
        origem: PontoMapa,
        destino: PontoMapa
    ): PontoMapa[] {
        const quantidadePontos = mapa.obterQuantidadePontos();

        const distancias: number[] = [];
        const visitados: boolean[] = [];
        const pontosAnteriores: PontoMapa[] = [];

        for (let indice = 0; indice < quantidadePontos; indice++) {
            distancias[indice] = Infinity;
            visitados[indice] = false;
            pontosAnteriores[indice] = null as unknown as PontoMapa;
        }

        let indiceOrigem = -1;
        let indiceDestino = -1;

        for (let indice = 0; indice < quantidadePontos; indice++) {
            const ponto = mapa.obterPonto(indice);

            if (ponto.id === origem.id) {
                indiceOrigem = indice;
            }

            if (ponto.id === destino.id) {
                indiceDestino = indice;
            }
        }

        if (indiceOrigem === -1 || indiceDestino === -1) {
            return [];
        }

        distancias[indiceOrigem] = 0;

        for (let contador = 0; contador < quantidadePontos; contador++) {
            let indiceMenorDistancia = -1;
            let menorDistancia = Infinity;

            for (let indice = 0; indice < quantidadePontos; indice++) {
                if (
                    !visitados[indice] &&
                    distancias[indice] < menorDistancia
                ) {
                    menorDistancia = distancias[indice];
                    indiceMenorDistancia = indice;
                }
            }

            if (indiceMenorDistancia === -1) {
                break;
            }

            visitados[indiceMenorDistancia] = true;

            if (indiceMenorDistancia === indiceDestino) {
                break;
            }

            const pontoAtual = mapa.obterPonto(indiceMenorDistancia);

            for (
                let indiceConexao = 0;
                indiceConexao < mapa.obterQuantidadeConexoes();
                indiceConexao++
            ) {
                const conexao = mapa.obterConexao(indiceConexao);

                if (
                    conexao.origem.x !== pontoAtual.posicao.x ||
                    conexao.origem.y !== pontoAtual.posicao.y
                ) {
                    continue;
                }

                const pontoVizinho = mapa.buscarPontoPorPosicao(
                    conexao.destino.x,
                    conexao.destino.y
                );

                if (pontoVizinho === null) {
                    continue;
                }

                let indiceVizinho = -1;

                for (let indice = 0; indice < quantidadePontos; indice++) {
                    const ponto = mapa.obterPonto(indice);

                    if (ponto.id === pontoVizinho.id) {
                        indiceVizinho = indice;
                        break;
                    }
                }

                if (indiceVizinho === -1 || visitados[indiceVizinho]) {
                    continue;
                }

                const novaDistancia =
                    distancias[indiceMenorDistancia] +
                    conexao.distancia;

                if (novaDistancia < distancias[indiceVizinho]) {
                    distancias[indiceVizinho] = novaDistancia;
                    pontosAnteriores[indiceVizinho] = pontoAtual;
                }
            }
        }

        if (distancias[indiceDestino] === Infinity) {
            return [];
        }

        const caminho: PontoMapa[] = [];
        let indiceAtual = indiceDestino;
        let quantidadeCaminho = 0;

        while (indiceAtual !== indiceOrigem) {
            const pontoAtual = mapa.obterPonto(indiceAtual);

            caminho[quantidadeCaminho] = pontoAtual;
            quantidadeCaminho++;

            const pontoAnterior = pontosAnteriores[indiceAtual];

            if (pontoAnterior === null) {
                return [];
            }

            let indiceAnterior = -1;

            for (let indice = 0; indice < quantidadePontos; indice++) {
                const ponto = mapa.obterPonto(indice);

                if (ponto.id === pontoAnterior.id) {
                    indiceAnterior = indice;
                    break;
                }
            }

            if (indiceAnterior === -1) {
                return [];
            }

            indiceAtual = indiceAnterior;
        }

        caminho[quantidadeCaminho] = origem;
        quantidadeCaminho++;

        let inicio = 0;
        let fim = quantidadeCaminho - 1;

        while (inicio < fim) {
            const pontoTemporario = caminho[inicio];
            caminho[inicio] = caminho[fim];
            caminho[fim] = pontoTemporario;

            inicio++;
            fim--;
        }

        return caminho;
    }
}