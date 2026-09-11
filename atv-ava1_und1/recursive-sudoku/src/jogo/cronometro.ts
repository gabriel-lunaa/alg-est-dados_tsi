let tempoInicio = 0;
let tempoPausado = 0;
let cronometro: number | undefined;

function formatarTempo(segundos: number): string {

    const minutos = Math.floor(segundos / 60);

    const segundosRestantes = segundos % 60;

    return `${minutos.toString().padStart(2, "0")}:${segundosRestantes
        .toString()
        .padStart(2, "0")}`;
}

export function iniciarCronometro(): void {

    tempoInicio = Date.now();

    cronometro = window.setInterval(() => {

        const tempoDecorrido =
            tempoPausado +
            Math.floor(
                (Date.now() - tempoInicio) / 1000
            );

        const elementoTempo =
            document.querySelector<HTMLElement>(
                "#tempo"
            );

        if (elementoTempo) {

            elementoTempo.textContent =
                formatarTempo(tempoDecorrido);
        }

    }, 1000);
}

export function pararCronometro(
    acumularTempo = true
): void {

    if (cronometro !== undefined) {

        if (acumularTempo) {

            tempoPausado +=
                Math.floor(
                    (Date.now() - tempoInicio) / 1000
                );
        }

        clearInterval(cronometro);

        cronometro = undefined;
    }
}
