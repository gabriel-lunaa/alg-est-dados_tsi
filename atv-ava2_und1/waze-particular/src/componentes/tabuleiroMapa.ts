import type { TabuleiroMapa } from "../estruturas/tabuleiroMapa";
import type { Posicao } from "../tipos/posicao";

export function criarTabuleiroVisual(
    tabuleiro: TabuleiroMapa,
    caminho: Posicao[] = [],
    origem: Posicao | null = null,
    destino: Posicao | null = null,
    aoClicarCelula:
        ((x: number, y: number) => void) | null = null
): HTMLDivElement {
    const elementoTabuleiro =
        document.createElement("div");

    elementoTabuleiro.className =
        "grid w-full h-full gap-1 rounded-2xl bg-blue-200 p-2";

    elementoTabuleiro.style.gridTemplateColumns =
        `repeat(${tabuleiro.obterLargura()}, minmax(0, 1fr))`;

    elementoTabuleiro.style.gridTemplateRows =
        `repeat(${tabuleiro.obterAltura()}, minmax(0, 1fr))`;

    for (
        let y = 0;
        y < tabuleiro.obterAltura();
        y++
    ) {
        for (
            let x = 0;
            x < tabuleiro.obterLargura();
            x++
        ) {
            const celula =
                tabuleiro.obterCelula(x, y);

            if (celula === null) {
                continue;
            }

            const elementoCelula =
                document.createElement("div");

            elementoCelula.className =
                "relative flex min-h-0 items-center justify-center rounded-lg";

            if (aoClicarCelula !== null) {
                elementoCelula.addEventListener(
                    "click",
                    () => {
                        aoClicarCelula(x, y);
                    }
                );

                elementoCelula.className +=
                    " cursor-pointer";
            }



            /*
             * APARÊNCIA BÁSICA DA CÉLULA
             */

            if (celula.tipo === "vazio") {
                elementoCelula.className +=
                    " !bg-[#fdfbd4]";
            }

            if (celula.tipo === "rua") {
                elementoCelula.className +=
                    " rounded-md bg-white ring-1 ring-[#f6f7f9]";

                if (
                    celula.nivelTransito ===
                    "moderado"
                ) {
                    elementoCelula.className +=
                        " !bg-orange-300";
                }

                if (
                    celula.nivelTransito ===
                    "intenso"
                ) {
                    elementoCelula.className +=
                        " !bg-red-400";
                }
            }

            if (celula.tipo === "casa") {
                elementoCelula.className +=
                    " rounded-md bg-slate-100 ring-1 ring-slate-200";
            }

            if (celula.tipo === "predio") {
                elementoCelula.className +=
                    " rounded-md bg-slate-200 ring-1 ring-slate-300";
            }

            if (celula.tipo === "praca") {
                elementoCelula.className +=
                    " rounded-md bg-emerald-50 ring-1 ring-emerald-100";
            }

            if (celula.tipo === "estabelecimento") {
                elementoCelula.className +=
                    " rounded-md bg-[#989ea3] ring-1 ring-[#7f858a]";
            }

            const desenhoCelula: Record<
                string,
                { simbolo: string; cor: string }
            > = {
                vazio: { simbolo: "", cor: "" },
                terreno: { simbolo: "·", cor: "text-amber-500/60" },
                rua: { simbolo: "", cor: "" },
                casa: { simbolo: "⌂", cor: "text-orange-600" },
                predio: { simbolo: "▥", cor: "text-indigo-600" },
                praca: { simbolo: "✿", cor: "text-emerald-600" },
                estabelecimento: { simbolo: "▣", cor: "text-slate-100" }
            };

            const desenho = desenhoCelula[celula.tipo];

            if (desenho.simbolo !== "") {
                const elementoDesenho =
                    document.createElement("span");

                elementoDesenho.className =
                    `pointer-events-none absolute inset-0 flex items-center justify-center text-xl font-black leading-none ${desenho.cor}`;
                elementoDesenho.textContent = desenho.simbolo;

                elementoCelula.appendChild(
                    elementoDesenho
                );
            }

            /*
             * ROTA
             */

            let fazParteDoCaminho = false;

            for (
                let indice = 0;
                indice < caminho.length;
                indice++
            ) {
                if (
                    caminho[indice].x === x &&
                    caminho[indice].y === y
                ) {
                    fazParteDoCaminho = true;
                    break;
                }
            }

            if (fazParteDoCaminho) {
                elementoCelula.className +=
                    " !bg-blue-500 ring-2 ring-blue-600";
            }

            /*
             * ORIGEM
             */

            if (
                origem !== null &&
                origem.x === x &&
                origem.y === y
            ) {
                elementoCelula.className +=
                    " !bg-green-500 ring-2 ring-green-700";

                const indicadorOrigem =
                    document.createElement("span");

                indicadorOrigem.className =
                    "text-xs font-black text-white";

                indicadorOrigem.textContent = "A";

                elementoCelula.appendChild(
                    indicadorOrigem
                );
            }

            /*
             * DESTINO
             */

            if (
                destino !== null &&
                destino.x === x &&
                destino.y === y
            ) {
                elementoCelula.className +=
                    " !bg-red-500 ring-2 ring-red-700";

                const indicadorDestino =
                    document.createElement("span");

                indicadorDestino.className =
                    "text-xs font-black text-white";

                indicadorDestino.textContent = "B";

                elementoCelula.appendChild(
                    indicadorDestino
                );
            }

            /*
             * NOME DO PONTO
             */

            if (
                celula.ponto !== null &&
                !(
                    origem !== null &&
                    origem.x === x &&
                    origem.y === y
                ) &&
                !(
                    destino !== null &&
                    destino.x === x &&
                    destino.y === y
                )
            ) {
                const nomePonto =
                    document.createElement("span");

                nomePonto.className =
                    "px-1 text-center text-[10px] font-bold leading-tight text-slate-700";

                nomePonto.textContent =
                    celula.ponto.nome;

                elementoCelula.appendChild(
                    nomePonto
                );
            }

            elementoTabuleiro.appendChild(
                elementoCelula
            );
        }
    }

    return elementoTabuleiro;
}