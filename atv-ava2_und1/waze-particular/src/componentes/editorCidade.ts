import type { TabuleiroMapa } from "../estruturas/tabuleiroMapa";
import { criarTabuleiroVisual } from "./tabuleiroMapa";

type TipoEdicao =
    | "terreno"
    | "rua"
    | "casa"
    | "predio"
    | "praca";

export class EditorCidade {
    private tipoSelecionado: TipoEdicao =
        "terreno";

    private nomeMapa: string = "";

    private salvarMapa(
        tabuleiro: TabuleiroMapa
    ): void {
        const nomeMapa =
            this.nomeMapa.trim();

        if (nomeMapa.length === 0) {
            alert(
                "Digite um nome para o mapa."
            );

            return;
        }

        const mapaSalvo = {
            nome: nomeMapa,
            largura:
                tabuleiro.obterLargura(),
            altura:
                tabuleiro.obterAltura(),
            celulas:
                tabuleiro.obterCelulas()
        };

        const mapasSalvosTexto =
            localStorage.getItem(
                "waze-particular-mapas"
            );

        let mapasSalvos:
            typeof mapaSalvo[] = [];

        if (mapasSalvosTexto !== null) {
            mapasSalvos =
                JSON.parse(
                    mapasSalvosTexto
                );
        }

        mapasSalvos[
            mapasSalvos.length
        ] = mapaSalvo;

        localStorage.setItem(
            "waze-particular-mapas",
            JSON.stringify(
                mapasSalvos
            )
        );

        alert(
            "Mapa salvo com sucesso!"
        );
    }

    private elementoEditor:
        HTMLDivElement | null = null;

    private elementoTabuleiro:
        HTMLDivElement | null = null;

    public iniciar(
        tabuleiro: TabuleiroMapa,
        area: HTMLDivElement
    ): void {
        this.elementoEditor =
            document.createElement("div");

        this.elementoEditor.className =
            "absolute bottom-6 right-6 z-20 w-72 rounded-3xl bg-white/95 p-5 shadow-2xl backdrop-blur";

        const titulo =
            document.createElement("h2");

        titulo.className =
            "text-lg font-bold text-slate-900";

        titulo.textContent =
            "Editar cidade";

        this.elementoEditor.appendChild(
            titulo
        );

        const descricao =
            document.createElement("p");

        descricao.className =
            "mt-1 text-sm text-slate-500";

        descricao.textContent =
            "Escolha o tipo e clique nos quadrinhos.";

        this.elementoEditor.appendChild(
            descricao
        );

        const campoNome =
            document.createElement("input");

        campoNome.type = "text";

        campoNome.placeholder =
            "Nome da cidade";

        campoNome.className =
            "mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

        campoNome.addEventListener(
            "input",
            () => {
                this.nomeMapa =
                    campoNome.value;
            }
        );

        this.elementoEditor.appendChild(
            campoNome
        );

        const controles =
            document.createElement("div");

        controles.className =
            "mt-4 grid grid-cols-2 gap-2";

        this.criarBotaoTipo(
            controles,
            "🌿 Terreno",
            "terreno"
        );

        this.criarBotaoTipo(
            controles,
            "🛣️ Rua",
            "rua"
        );

        this.criarBotaoTipo(
            controles,
            "🏠 Casa",
            "casa"
        );

        this.criarBotaoTipo(
            controles,
            "🏢 Prédio",
            "predio"
        );

        this.criarBotaoTipo(
            controles,
            "🌳 Praça",
            "praca"
        );

        this.elementoEditor.appendChild(
            controles
        );

        this.atualizarBotoes(
            controles
        );

        const botaoSalvar =
            document.createElement("button");

        botaoSalvar.type = "button";

        botaoSalvar.className =
            "mt-4 w-full rounded-2xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700";

        botaoSalvar.textContent =
            "Salvar mapa";

        botaoSalvar.addEventListener(
            "click",
            () => {
                this.salvarMapa(
                    tabuleiro
                );
            }
        );

        this.elementoEditor.appendChild(
            botaoSalvar
        );

        area.appendChild(
            this.elementoEditor
        );

        this.atualizarTabuleiro(
            tabuleiro,
            area
        );
    }

    private criarBotaoTipo(
        area: HTMLDivElement,
        texto: string,
        tipo: TipoEdicao
    ): void {
        const botao =
            document.createElement("button");

        botao.type = "button";

        botao.className =
            "rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100";

        botao.textContent = texto;

        botao.addEventListener(
            "click",
            () => {
                this.tipoSelecionado = tipo;

                this.atualizarBotoes(
                    area
                );
            }
        );

        area.appendChild(botao);
    }

    private atualizarBotoes(
        area: HTMLDivElement
    ): void {
        const botoes =
            area.querySelectorAll(
                "button"
            );

        for (
            let indice = 0;
            indice < botoes.length;
            indice++
        ) {
            botoes[indice].classList.remove(
                "bg-blue-600",
                "text-white"
            );

            botoes[indice].classList.add(
                "bg-slate-50",
                "text-slate-700"
            );
        }

        const indiceSelecionado =
            this.obterIndiceTipo();

        if (
            indiceSelecionado >= 0 &&
            indiceSelecionado < botoes.length
        ) {
            botoes[
                indiceSelecionado
            ].classList.remove(
                "bg-slate-50",
                "text-slate-700"
            );

            botoes[
                indiceSelecionado
            ].classList.add(
                "bg-blue-600",
                "text-white"
            );
        }
    }

    private obterIndiceTipo(): number {
        if (
            this.tipoSelecionado ===
            "terreno"
        ) {
            return 0;
        }

        if (
            this.tipoSelecionado ===
            "rua"
        ) {
            return 1;
        }

        if (
            this.tipoSelecionado ===
            "casa"
        ) {
            return 2;
        }

        if (
            this.tipoSelecionado ===
            "predio"
        ) {
            return 3;
        }

        return 4;
    }

    private atualizarTabuleiro(
        tabuleiro: TabuleiroMapa,
        area: HTMLDivElement
    ): void {
        if (
            this.elementoTabuleiro !== null
        ) {
            this.elementoTabuleiro.remove();
        }

        this.elementoTabuleiro =
            criarTabuleiroVisual(
                tabuleiro,
                [],
                null,
                null,
                (
                    x: number,
                    y: number
                ) => {
                    this.alterarCelula(
                        tabuleiro,
                        x,
                        y
                    );

                    this.atualizarTabuleiro(
                        tabuleiro,
                        area
                    );
                }
            );

        area.appendChild(
            this.elementoTabuleiro
        );
    }

    private alterarCelula(
        tabuleiro: TabuleiroMapa,
        x: number,
        y: number
    ): void {
        if (
            this.tipoSelecionado ===
            "terreno"
        ) {
            tabuleiro.definirTerreno(
                x,
                y
            );
        }

        if (
            this.tipoSelecionado ===
            "rua"
        ) {
            tabuleiro.definirRua(
                x,
                y
            );
        }

        if (
            this.tipoSelecionado ===
            "casa"
        ) {
            tabuleiro.definirCasa(
                x,
                y
            );
        }

        if (
            this.tipoSelecionado ===
            "predio"
        ) {
            tabuleiro.definirPredio(
                x,
                y
            );
        }

        if (
            this.tipoSelecionado ===
            "praca"
        ) {
            tabuleiro.definirPraca(
                x,
                y
            );
        }
    }
}
