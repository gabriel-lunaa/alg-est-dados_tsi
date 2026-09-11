type NivelDificuldade =
    "facil" |
    "medio" |
    "dificil";

export function configurarDificuldade(): void {

    const popupDificuldade =
        document.querySelector<HTMLDivElement>(
            "#popup-dificuldade"
        );

    const cancelarDificuldade =
        document.querySelector<HTMLButtonElement>(
            "#cancelar-dificuldade"
        );

    const confirmarDificuldade =
        document.querySelector<HTMLButtonElement>(
            "#confirmar-dificuldade"
        );

    const opcoesDificuldade =
        document.querySelectorAll<HTMLButtonElement>(
            ".opcao-dificuldade"
        );

    let nivelSelecionado:
        NivelDificuldade |
        null = null;

    opcoesDificuldade.forEach(
        (opcao) => {

            opcao.addEventListener(
                "click",
                () => {

                    opcoesDificuldade.forEach(
                        (outraOpcao) => {

                            outraOpcao.classList.remove(
                                "selecionada"
                            );

                        }
                    );

                    opcao.classList.add(
                        "selecionada"
                    );

                    nivelSelecionado =
                        opcao.dataset.nivel as
                        NivelDificuldade;

                    if (confirmarDificuldade) {

                        confirmarDificuldade.disabled =
                            false;

                    }

                }
            );

        }
    );

    cancelarDificuldade?.addEventListener(
        "click",
        () => {

            popupDificuldade?.classList.add(
                "popup-oculto"
            );

            nivelSelecionado = null;

            opcoesDificuldade.forEach(
                (opcao) => {

                    opcao.classList.remove(
                        "selecionada"
                    );

                }
            );

            if (confirmarDificuldade) {

                confirmarDificuldade.disabled =
                    true;

            }

        }
    );

    confirmarDificuldade?.addEventListener(
        "click",
        () => {

            if (!nivelSelecionado) {
                return;
            }

            localStorage.setItem(
                "nivel",
                nivelSelecionado
            );

            window.location.href = "/jogo.html";

        }
    );
}
