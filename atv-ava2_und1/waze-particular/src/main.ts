import { criarMapaDemonstracao } from "./mapas/mapaDemonstracao";
import { MenorDistancia } from "./algoritmos/menorDistancia";
import { GeradorTransitoAleatorio } from "./algoritmos/geradorTransitoAleatorio";
import { criarTabuleiroVisual } from "./componentes/tabuleiroMapa";
import { MenuLateral } from "./componentes/menuLateral";
import { EditorCidade } from "./componentes/editorCidade";
import { TabuleiroMapa } from "./estruturas/tabuleiroMapa";
import type { CelulaMapa } from "./tipos/celulaMapa";
import type { Posicao } from "./tipos/posicao";
import "./style.css";

const mapa = criarMapaDemonstracao();

const tabuleiro = mapa.obterTabuleiro();

if (tabuleiro === null) {
    console.error("Tabuleiro do mapa não encontrado.");
}

const origem = mapa.buscarPontoPorId(1);
const destino = mapa.buscarPontoPorId(4);

if (origem === null || destino === null) {
    console.error("Origem ou destino não encontrados no mapa.");
}

let origemSelecionada: Posicao | null = null;
let destinoSelecionado: Posicao | null = null;

function selecionarCelula(
    x: number,
    y: number
): void {
    if (tabuleiro === null) {
        return;
    }

    const celula =
        tabuleiro.obterCelula(x, y);

    if (celula === null) {
        return;
    }

    if (!celula.transitavel) {
        return;
    }

    if (origemSelecionada === null) {
        origemSelecionada = {
            x: x,
            y: y
        };

    } else if (destinoSelecionado === null) {
        destinoSelecionado = {
            x: x,
            y: y
        };

    } else {
        return;
    }

    atualizarTabuleiroVisual();
}

function atualizarTabuleiroVisual(): void {
    if (
        tabuleiro === null ||
        areaTabuleiro === null
    ) {
        return;
    }

    areaTabuleiro.innerHTML = "";

    elementoTabuleiro =
        criarTabuleiroVisual(
            tabuleiro,
            [],
            origemSelecionada,
            destinoSelecionado,
            selecionarCelula
        );

    areaTabuleiro.appendChild(
        elementoTabuleiro
    );

    menuLateral.iniciar(
        areaMenu!,
        tratarOpcaoMenu
    );
}

let elementoTabuleiro:
    HTMLDivElement | null = null;

if (tabuleiro !== null) {
    elementoTabuleiro =
        criarTabuleiroVisual(
            tabuleiro,
            [],
            null,
            null,
            selecionarCelula
        );
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <main class="min-h-screen bg-slate-100 text-slate-900">
        <header class="absolute left-0 right-0 top-0 z-20 flex items-center justify-end px-6 py-5">
            <div class="flex items-center gap-3">
                <div class="rounded-2xl bg-white/95 px-5 py-3 shadow-lg backdrop-blur">
                    <h1 class="text-xl font-bold tracking-tight text-slate-900">
                        Waze Particular
                    </h1>
                    <p class="text-xs text-slate-500">
                        Seu navegador de rotas
                    </p>
                </div>

                <div id="area-menu" class="relative h-12 w-12"></div>
            </div>

        </header>

<section class="flex min-h-screen items-center justify-center overflow-hidden px-6 pb-8 pt-20">
    <div class="flex w-full max-w-7xl items-center justify-center gap-8">

    <div
        id="area-tabuleiro"
        class="relative flex aspect-[4/3] w-full max-w-5xl items-center justify-center overflow-hidden rounded-3xl bg-[#fdfbd4] shadow-xl"
    ></div>

    <div class="w-80 shrink-0">
        <div class="rounded-3xl bg-white/95 p-5 shadow-2xl backdrop-blur">
            <div class="mb-5">
                <h2 class="text-lg font-bold text-slate-900">
                    Planeje sua rota
                </h2>

                <p class="mt-1 text-sm text-slate-500">
                    Escolha onde você está e para onde deseja ir.
                </p>
            </div>

            <div class="space-y-3">
                <div class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    

                    <div class="min-w-0">
                        <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Origem
                        </p>

                        <p class="truncate text-sm font-semibold text-slate-700">
                            Ponto A
                        </p>
                    </div>
                </div>

                <div class="ml-7 h-4 border-l-2 border-dashed border-slate-300"></div>


                    <div class="min-w-0">
                        <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Destino
                        </p>

                        <p class="truncate text-sm font-semibold text-slate-700">
                            Ponto B
                        </p>
                    </div>
                </div>
            </div>

            <button
                id="botao-calcular-rota"
                class="mt-5 w-full rounded-2xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700 active:translate-y-0"
            >
                Calcular rota
            </button>
        </div>
    </div>

</div>

                    <div class="flex items-center justify-between">
                        <div>
                            <p 
                            </p>
                            <p 
                            </p>
                        </div>

                        <div class="h-10 w-px bg-slate-200"></div>

                        <div>
                            <p 
                            </p>
                            <p 
                            </p>
                        </div>
                    </div>

                    <div class="mt-4 flex items-center gap-2 text-sm text-slate-500">
                        <span
                            
                        ></span>

                        <span id="texto-rota"></span>
                    </div>

                    <p
                        
                    >
                        
                    </p>
                </div>
            </div>

            

            
        </section>
    </main>
`;

const areaTabuleiro =
    document.querySelector<HTMLDivElement>("#area-tabuleiro");
const areaMenu =
    document.querySelector<HTMLDivElement>("#area-menu");

const menuLateral =
    new MenuLateral();

function mostrarMenuInicial(): void {
    if (areaTabuleiro === null) {
        return;
    }

    areaTabuleiro.innerHTML = "";

    if (elementoTabuleiro !== null) {
        areaTabuleiro.appendChild(
            elementoTabuleiro
        );
    }

    menuLateral.iniciar(
        areaMenu!,
        tratarOpcaoMenu
    );
}

function criarNovoMapa(): void {
    if (areaTabuleiro === null) {
        return;
    }

    areaTabuleiro.innerHTML = "";

    const novoTabuleiro =
        new TabuleiroMapa(
            16,
            12
        );

    const editorCidade =
        new EditorCidade();

    editorCidade.iniciar(
        novoTabuleiro,
        areaTabuleiro
    );

    menuLateral.iniciar(
        areaMenu!,
        tratarOpcaoMenu
    );
}

function abrirMapaSalvo(
    nomeMapa: string
): void {
    if (areaTabuleiro === null) {
        return;
    }

    const mapasSalvosTexto =
        localStorage.getItem(
            "waze-particular-mapas"
        );

    if (mapasSalvosTexto === null) {
        return;
    }

    const mapasSalvos:
        {
            nome: string;
            largura: number;
            altura: number;
            celulas: CelulaMapa[];
        }[] = JSON.parse(
            mapasSalvosTexto
        );

    let mapaEncontrado:
        {
            nome: string;
            largura: number;
            altura: number;
            celulas: CelulaMapa[];
        } | null = null;

    for (
        let indice = 0;
        indice < mapasSalvos.length;
        indice++
    ) {
        if (
            mapasSalvos[indice].nome ===
            nomeMapa
        ) {
            mapaEncontrado =
                mapasSalvos[indice];

            break;
        }
    }

    if (mapaEncontrado === null) {
        return;
    }

    const tabuleiro =
        new TabuleiroMapa(
            mapaEncontrado.largura,
            mapaEncontrado.altura
        );

    tabuleiro.carregarCelulas(
        mapaEncontrado.celulas
    );

    areaTabuleiro.innerHTML = "";

    const elementoTabuleiro =
        criarTabuleiroVisual(
            tabuleiro
        );

    areaTabuleiro.appendChild(
        elementoTabuleiro
    );

    menuLateral.iniciar(
        areaMenu!,
        tratarOpcaoMenu
    );
}

function selecionarMapa(): void {
    if (areaTabuleiro === null) {
        return;
    }

    areaTabuleiro.innerHTML = "";

    const painel =
        document.createElement("div");

    painel.className =
        "absolute inset-0 overflow-auto bg-blue-50 p-6";

    const mapasSalvosTexto =
        localStorage.getItem(
            "waze-particular-mapas"
        );

    let mapasSalvos:
        {
            nome: string;
            largura: number;
            altura: number;
        }[] = [];

    if (mapasSalvosTexto !== null) {
        mapasSalvos =
            JSON.parse(
                mapasSalvosTexto
            );
    }

    const conteudo =
        document.createElement("div");

    conteudo.className =
        "mx-auto w-full max-w-2xl";

    const titulo =
        document.createElement("h2");

    titulo.className =
        "text-2xl font-bold text-slate-900";

    titulo.textContent =
        "Selecionar mapa";

    conteudo.appendChild(
        titulo
    );

    const descricao =
        document.createElement("p");

    descricao.className =
        "mt-2 text-sm text-slate-500";

    descricao.textContent =
        "Escolha uma cidade para abrir o mapa.";

    conteudo.appendChild(
        descricao
    );

    if (mapasSalvos.length === 0) {
        const mensagem =
            document.createElement("div");

        mensagem.className =
            "mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm";

        mensagem.innerHTML = `
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
                🗺️
            </div>

            <p class="mt-5 text-sm font-semibold text-slate-600">
                Nenhum mapa salvo ainda.
            </p>

            <p class="mt-1 text-xs text-slate-400">
                Crie um novo mapa para ele aparecer aqui.
            </p>
        `;

        conteudo.appendChild(
            mensagem
        );
    }

    if (mapasSalvos.length > 0) {
        const lista =
            document.createElement("div");

        lista.className =
            "mt-6 space-y-3";

        for (
            let indice = 0;
            indice < mapasSalvos.length;
            indice++
        ) {
            const mapa =
                mapasSalvos[indice];

            const botao =
                document.createElement("button");

            botao.type = "button";

            botao.className =
                "flex w-full items-center justify-between rounded-3xl bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg";

            botao.innerHTML = `
                <div>
                    <p class="font-bold text-slate-900">
                        ${mapa.nome}
                    </p>

                    <p class="mt-1 text-xs text-slate-400">
                        ${mapa.largura} × ${mapa.altura} quadrinhos
                    </p>
                </div>

                <span class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    →
                </span>
            `;

            botao.addEventListener(
                "click",
                () => {
                    abrirMapaSalvo(
                        mapa.nome
                    );
                }
            );

            lista.appendChild(
                botao
            );
        }

        conteudo.appendChild(
            lista
        );
    }

    painel.appendChild(
        conteudo
    );

    areaTabuleiro.appendChild(
        painel
    );

    menuLateral.iniciar(
        areaMenu!,
        tratarOpcaoMenu
    );
}

function tratarOpcaoMenu(
    opcao: string
): void {
    if (opcao === "inicio") {
        mostrarMenuInicial();

        return;
    }

    if (opcao === "novoMapa") {
        criarNovoMapa();

        return;
    }

    if (opcao === "selecionarMapa") {
        selecionarMapa();
    }
}

menuLateral.iniciar(
    areaMenu!,
    tratarOpcaoMenu
);

if (areaTabuleiro !== null && elementoTabuleiro !== null) {
    areaTabuleiro.appendChild(elementoTabuleiro);
}

const botaoCalcularRota =
    document.querySelector<HTMLButtonElement>("#botao-calcular-rota");

botaoCalcularRota?.addEventListener("click", () => {
    if (tabuleiro === null) {
        console.error(
            "O tabuleiro não foi carregado."
        );

        return;
    }

    const geradorTransito =
        new GeradorTransitoAleatorio();

    geradorTransito.gerar(tabuleiro);

    const menorDistancia =
        new MenorDistancia();

    if (
        origemSelecionada === null ||
        destinoSelecionado === null
    ) {
        alert(
            "Selecione uma origem e um destino no mapa."
        );

        return;
    }

    const caminho =
        menorDistancia.calcular(
            tabuleiro,
            origemSelecionada,
            destinoSelecionado
        );

    if (caminho.length === 0) {
        console.error(
            "Nenhum caminho foi encontrado."
        );

        return;
    }

    if (areaTabuleiro !== null) {
        areaTabuleiro.innerHTML = "";

        const novoTabuleiro =
            criarTabuleiroVisual(
                tabuleiro,
                caminho,
                origemSelecionada,
                destinoSelecionado
            );

        areaTabuleiro.appendChild(
            novoTabuleiro
        );
    }

});