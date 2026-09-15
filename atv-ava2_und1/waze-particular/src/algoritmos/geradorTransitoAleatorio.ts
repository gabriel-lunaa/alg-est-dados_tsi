import type { TabuleiroMapa } from "../estruturas/tabuleiroMapa";

export class GeradorTransitoAleatorio {
    public gerar(
        tabuleiro: TabuleiroMapa
    ): void {
        const largura =
            tabuleiro.obterLargura();

        const altura =
            tabuleiro.obterAltura();

        for (
            let y = 0;
            y < altura;
            y++
        ) {
            for (
                let x = 0;
                x < largura;
                x++
            ) {
                const celula =
                    tabuleiro.obterCelula(
                        x,
                        y
                    );

                if (celula === null) {
                    continue;
                }

                if (celula.tipo !== "rua") {
                    continue;
                }

                const numeroAleatorio =
                    Math.random();

                if (numeroAleatorio < 0.10) {
                    tabuleiro.alterarTransito(
                        x,
                        y,
                        "intenso"
                    );

                    continue;
                }

                if (numeroAleatorio < 0.25) {
                    tabuleiro.alterarTransito(
                        x,
                        y,
                        "moderado"
                    );

                    continue;
                }

                tabuleiro.alterarTransito(
                    x,
                    y,
                    "livre"
                );
            }
        }
    }
}
