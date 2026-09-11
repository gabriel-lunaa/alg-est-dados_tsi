import { configurarDificuldade } from "./dificuldade";

export function iniciarMenu(): void {

    const aplicativo =
        document.querySelector<HTMLDivElement>(
            "#app"
        );

    if (!aplicativo) {
        return;
    }

    aplicativo.innerHTML = `

        <main
            class="menu-inicial"
            id="menu-inicial"
        >

            <button
                id="alternar-modo"
                class="botao-modo"
                aria-label="Alternar modo de exibição"
            >
                🌙
            </button>

            <div class="menu-conteudo">

                <span class="subtitulo">
                </span>

                <h1>
                    Sudoku
                </h1>

                <p>
                    Desafie a sua lógica.<br><br><br><br>
                </p>

                <div class="menu-botoes">

                    <button
                        id="iniciar-partida"
                        class="botao-menu botao-iniciar"
                    >
                        Iniciar partida
                    </button>

                </div>

            </div>

        </main>

        <div
            id="popup-dificuldade"
            class="popup-fundo popup-oculto"
        >

            <div class="popup-dificuldade">

                <h2>
                    Escolha a dificuldade
                </h2>

                <p>
                    Selecione o nível da partida:
                </p>

                <div class="opcoes-dificuldade">

                    <button
                        class="opcao-dificuldade"
                        data-nivel="facil"
                    >
                        <strong>Fácil</strong>
                        <span>45 números iniciais</span>
                    </button>

                    <button
                        class="opcao-dificuldade"
                        data-nivel="medio"
                    >
                        <strong>Médio</strong>
                        <span>36 números iniciais</span>
                    </button>

                    <button
                        class="opcao-dificuldade"
                        data-nivel="dificil"
                    >
                        <strong>Difícil</strong>
                        <span>28 números iniciais</span>
                    </button>

                </div>

                <div class="popup-botoes">

                    <button
                        id="cancelar-dificuldade"
                        class="botao-popup botao-cancelar"
                    >
                        Cancelar
                    </button>

                    <button
                        id="confirmar-dificuldade"
                        class="botao-popup botao-confirmar"
                        disabled
                    >
                        Começar
                    </button>

                </div>

            </div>

        </div>
    `;

    const botaoIniciar =
        document.querySelector<HTMLButtonElement>(
            "#iniciar-partida"
        );

    const popupDificuldade =
        document.querySelector<HTMLDivElement>(
            "#popup-dificuldade"
        );

    botaoIniciar?.addEventListener(
        "click",
        () => {

            popupDificuldade?.classList.remove(
                "popup-oculto"
            );

        }
    );

    configurarDificuldade();
}
