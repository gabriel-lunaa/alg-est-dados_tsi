export type OpcaoMenu =
    | "inicio"
    | "novoMapa"
    | "selecionarMapa";

export class MenuLateral {
    private elementoMenu: HTMLDivElement | null = null;
    private elementoFundo: HTMLDivElement | null = null;

    private aoSelecionar:
        ((opcao: OpcaoMenu) => void) | null = null;

    public iniciar(
        area: HTMLDivElement,
        aoSelecionar:
            (opcao: OpcaoMenu) => void
    ): void {
        this.aoSelecionar = aoSelecionar;
        area.innerHTML = "";

        const botaoMenu =
            document.createElement("button");

        botaoMenu.type = "button";

        botaoMenu.id =
            "botao-menu-lateral";

        botaoMenu.className =
            "absolute inset-0 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-2xl text-slate-700 shadow-lg backdrop-blur transition hover:scale-105";

        botaoMenu.textContent = "☰";

        area.appendChild(botaoMenu);

        this.elementoMenu =
            document.createElement("div");

        this.elementoMenu.className =
            "fixed left-0 top-0 z-[70] h-full w-80 -translate-x-full bg-white shadow-2xl transition-transform duration-300 ease-out";

        this.elementoFundo =
            document.createElement("div");

        this.elementoFundo.className =
            "pointer-events-none fixed inset-0 z-[65] bg-slate-900/20 opacity-0 transition-opacity duration-300";

        this.elementoFundo.addEventListener(
            "click",
            () => {
                this.fechar();
            }
        );

        this.elementoMenu.innerHTML = `
            <div class="flex h-full flex-col">
                <div class="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                    <div>
                        <h2 class="text-lg font-bold text-slate-900">
                            Waze Particular
                        </h2>

                        <p class="mt-1 text-xs text-slate-500">
                            Navegação
                        </p>
                    </div>

                    <button
                        id="botao-fechar-menu"
                        class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-600 transition hover:bg-slate-200"
                        type="button"
                        aria-label="Fechar menu"
                    >
                        ✕
                    </button>
                </div>

                <nav class="flex-1 space-y-2 p-5">
                    <button
                        id="opcao-menu-inicial"
                        class="flex w-full items-center gap-4 rounded-2xl bg-blue-50 px-4 py-4 text-left text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                        type="button"
                    >
                        <span class="text-xl">🏠</span>

                        <span>
                            <span class="block">
                                Menu inicial
                            </span>

                            <span class="mt-1 block text-xs font-normal text-slate-400">
                                Planejar uma rota
                            </span>
                        </span>
                    </button>

                    <button
                        id="opcao-criar-mapa"
                        class="flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                        type="button"
                    >
                        <span class="text-xl">🗺️</span>

                        <span>
                            <span class="block">
                                Criar novo mapa
                            </span>

                            <span class="mt-1 block text-xs font-normal text-slate-400">
                                Editar a cidade
                            </span>
                        </span>
                    </button>

                    <button
                        id="opcao-selecionar-mapa"
                        class="flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                        type="button"
                    >
                        <span class="text-xl">📍</span>

                        <span>
                            <span class="block">
                                Selecionar mapa
                            </span>

                            <span class="mt-1 block text-xs font-normal text-slate-400">
                                Escolher uma cidade
                            </span>
                        </span>
                    </button>
                </nav>

                <div class="border-t border-slate-200 p-5">
                    <p class="text-center text-xs text-slate-400">
                        Waze Particular
                    </p>
                </div>
            </div>
        `;

        area.appendChild(this.elementoFundo);
        area.appendChild(this.elementoMenu);

        botaoMenu.addEventListener(
            "click",
            () => {
                this.abrir();
            }
        );

        const botaoFechar =
            this.elementoMenu.querySelector<HTMLButtonElement>(
                "#botao-fechar-menu"
            );

        botaoFechar?.addEventListener(
            "click",
            () => {
                this.fechar();
            }
        );

        const opcaoInicio =
            this.elementoMenu.querySelector<HTMLButtonElement>(
                "#opcao-menu-inicial"
            );

        opcaoInicio?.addEventListener(
            "click",
            () => {
                this.selecionar("inicio");
            }
        );

        const opcaoCriarMapa =
            this.elementoMenu.querySelector<HTMLButtonElement>(
                "#opcao-criar-mapa"
            );

        opcaoCriarMapa?.addEventListener(
            "click",
            () => {
                this.selecionar("novoMapa");
            }
        );

        const opcaoSelecionarMapa =
            this.elementoMenu.querySelector<HTMLButtonElement>(
                "#opcao-selecionar-mapa"
            );

        opcaoSelecionarMapa?.addEventListener(
            "click",
            () => {
                this.selecionar(
                    "selecionarMapa"
                );
            }
        );
    }

    private abrir(): void {
        if (
            this.elementoMenu === null
        ) {
            return;
        }

        this.elementoMenu.classList.remove(
            "-translate-x-full"
        );

        this.elementoMenu.classList.add(
            "translate-x-0"
        );

        this.elementoFundo?.classList.remove(
            "pointer-events-none",
            "opacity-0"
        );

        this.elementoFundo?.classList.add(
            "pointer-events-auto",
            "opacity-100"
        );
    }

    private fechar(): void {
        if (
            this.elementoMenu === null
        ) {
            return;
        }

        this.elementoMenu.classList.remove(
            "translate-x-0"
        );

        this.elementoMenu.classList.add(
            "-translate-x-full"
        );

        this.elementoFundo?.classList.remove(
            "pointer-events-auto",
            "opacity-100"
        );

        this.elementoFundo?.classList.add(
            "pointer-events-none",
            "opacity-0"
        );
    }

    private selecionar(
        opcao: OpcaoMenu
    ): void {
        this.fechar();

        if (
            this.aoSelecionar !== null
        ) {
            this.aoSelecionar(opcao);
        }
    }
}
