import "./style.css";

import type { Tabuleiro } from "./types";
import { movimentoValido } from "./sudoku";
import { resolverSudoku, gerarTabuleiroSudoku } from "./solver";


let acertos = 0;
let erros = 0;

let tempoInicio = 0;
let tempoPausado = 0;
let cronometro: number | undefined;

const linhasComemoradas = new Set<number>();
const colunasComemoradas = new Set<number>();
const blocosComemorados = new Set<string>();

let sudokuConcluido = false;
let ultimaLinhaPreenchida = -1;
let ultimaColunaPreenchida = -1;

//Função do Cronômetro
function formatarTempo(segundos: number): string {

    const minutos = Math.floor(segundos / 60);

    const segundosRestantes = segundos % 60;

    return `${minutos.toString().padStart(2, "0")}:${segundosRestantes
        .toString()
        .padStart(2, "0")}`;
}

function iniciarCronometro(): void {

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

function pararCronometro(
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

function verificarConclusao(): void {

    for (let linha = 0; linha < 9; linha++) {

        for (let coluna = 0; coluna < 9; coluna++) {

            if (tabuleiro[linha][coluna] === 0) {
                return;
            }

        }
    }

    if (sudokuConcluido) {
        return;
    }

    sudokuConcluido = true;

    pararCronometro();

    const mensagem =
        document.querySelector<HTMLElement>(
            "#mensagem"
        );

    if (mensagem) {

        mensagem.innerHTML = `
            <div class="mensagem-final">
                <strong>🎉 PARABÉNS!</strong>
                <span>Sudoku concluído!</span>
                <span>Você resolveu o desafio.</span>
            </div>
        `;

        mensagem.classList.add(
            "mensagem-sucesso"
        );
    }


    //Animação de Conclusão da Partida
    animarConclusaoFinal();
}

    function animarConclusaoFinal(): void {

        const celulas =
            document.querySelectorAll<HTMLElement>(
                ".celula"
            );

        const origemLinha =
            ultimaLinhaPreenchida;

        const origemColuna =
            ultimaColunaPreenchida;

        celulas.forEach((celula) => {

            const linha =
                Number(celula.dataset.linha);

            const coluna =
                Number(celula.dataset.coluna);

            const distancia =
                Math.max(
                    Math.abs(linha - origemLinha),
                    Math.abs(coluna - origemColuna)
                );

            const atraso =
                distancia * 70;

            setTimeout(() => {

                celula.classList.add(
                    "celebracao-final"
                );

                setTimeout(() => {

                    celula.classList.remove(
                        "celebracao-final"
                    );

                }, 1000);

            }, atraso);
        });
    }

    function verificarRegioesConcluidas(): void {

    //LINHAS
    for (let linha = 0; linha < 9; linha++) {

        if (linhasComemoradas.has(linha)) {
            continue;
        }

        const linhaCompleta =
            tabuleiro[linha].every(
                (numero) => numero !== 0
            );

        if (linhaCompleta) {

            linhasComemoradas.add(linha);

            animarLinha(linha);
        }
    }

    //COLUNAS
    for (let coluna = 0; coluna < 9; coluna++) {

        if (colunasComemoradas.has(coluna)) {
            continue;
        }

        let completa = true;

        for (let linha = 0; linha < 9; linha++) {

            if (tabuleiro[linha][coluna] === 0) {

                completa = false;

                break;
            }
        }

        if (completa) {

            colunasComemoradas.add(coluna);

            animarColuna(coluna);
        }
    }

    //BLOCOS
    for (let blocoLinha = 0; blocoLinha < 3; blocoLinha++) {

        for (let blocoColuna = 0; blocoColuna < 3; blocoColuna++) {

            const chave =
                `${blocoLinha}-${blocoColuna}`;

            if (blocosComemorados.has(chave)) {
                continue;
            }

            let completo = true;

            for (let linha = blocoLinha * 3;
                 linha < blocoLinha * 3 + 3;
                 linha++) {

                for (let coluna = blocoColuna * 3;
                     coluna < blocoColuna * 3 + 3;
                     coluna++) {

                    if (tabuleiro[linha][coluna] === 0) {

                        completo = false;

                        break;
                    }
                }

                if (!completo) {
                    break;
                }
            }

            if (completo) {

                blocosComemorados.add(chave);

                animarBloco(
                    blocoLinha,
                    blocoColuna
                );
            }
        }
    }
}

    //Animação de Conclusão de Linha/Coluna/Bloco
    function animarLinha(linha: number): void {

        for (let coluna = 0; coluna < 9; coluna++) {

            const celula =
                document.querySelector<HTMLElement>(
                    `.celula[data-linha="${linha}"][data-coluna="${coluna}"]`
                );

            if (celula) {

                setTimeout(() => {

                    celula.classList.add(
                        "regiao-concluida"
                    );

                    setTimeout(() => {

                        celula.classList.remove(
                            "regiao-concluida"
                        );

                    }, 600);

                }, coluna * 35);
            }
        }
    }

    function animarColuna(coluna: number): void {

        for (let linha = 0; linha < 9; linha++) {

            const celula =
                document.querySelector<HTMLElement>(
                    `.celula[data-linha="${linha}"][data-coluna="${coluna}"]`
                );

            if (celula) {

                setTimeout(() => {

                    celula.classList.add(
                        "regiao-concluida"
                    );

                    setTimeout(() => {

                        celula.classList.remove(
                            "regiao-concluida"
                        );

                    }, 600);

                }, linha * 35);
            }
        }
    }

    function animarBloco(
        blocoLinha: number,
        blocoColuna: number
    ): void {

        let atraso = 0;

        for (
            let linha = blocoLinha * 3;
            linha < blocoLinha * 3 + 3;
            linha++
        ) {

            for (
                let coluna = blocoColuna * 3;
                coluna < blocoColuna * 3 + 3;
                coluna++
            ) {

                const celula =
                    document.querySelector<HTMLElement>(
                        `.celula[data-linha="${linha}"][data-coluna="${coluna}"]`
                    );

                if (celula) {

                    setTimeout(() => {

                        celula.classList.add(
                            "regiao-concluida"
                        );

                        setTimeout(() => {

                            celula.classList.remove(
                                "regiao-concluida"
                            );

                        }, 600);

                    }, atraso);

                    atraso += 45;
                }
            }
        }
    }

//TABULEIRO
const nivelSalvo =
    localStorage.getItem("nivel");

const nivel =
    nivelSalvo === "facil" ||
    nivelSalvo === "medio" ||
    nivelSalvo === "dificil"
        ? nivelSalvo
        : "medio";

const partida =
    gerarTabuleiroSudoku(nivel);

const tabuleiro: Tabuleiro =
    partida.tabuleiro;

const solucao: Tabuleiro =
    partida.solucao;

const aplicativo =
    document.querySelector<HTMLDivElement>(
        "#app"
    );

if (aplicativo) {

    const modoSalvo =
        localStorage.getItem("modo");

    if (modoSalvo === "claro") {

        document.body.classList.add(
            "modo-claro"
        );

    }

    aplicativo.innerHTML = `

        <main
            class="aplicacao"
            id="jogo"
        >

            <button
                id="alternar-modo"
                class="botao-modo"
                aria-label="Alternar modo de exibição"
            >
                🌙
            </button>


            <header class="cabecalho">

                <div>

                    <h1>
                        Sudoku
                    </h1>

                    <span class="subtitulo">
                        RESOLVA O DESAFIO UTILIZANDO RACIOCÍNIO LÓGICO.
                    </span>

                    <p>
                        
                    </p>

                </div>

            </header>

            <section class="area-jogo">

                <div
                    id="tabuleiro"
                    class="tabuleiro"
                ></div>

                <aside class="painel">

                    <h2>Estatísticas</h2>

                    <div class="estatistica">

                        <span>Tempo</span>

                        <strong id="tempo">
                            00:00
                        </strong>

                    </div>

                    <div class="estatistica">

                        <span>Acertos</span>

                        <strong id="acertos">
                            0
                        </strong>

                    </div>

                    <div class="estatistica">

                        <span>Erros</span>

                        <strong id="erros">
                            0
                        </strong>

                    </div>

                 

                    <div
                        id="mensagem"
                        class="mensagem"
                    ></div>

                    <div class="botoes-jogo">

                    <button
                        id="voltar"
                        class="botao-jogo botao-voltar"
                    >
                        Voltar
                    </button>

                    <button
                        id="pausar"
                        class="botao-jogo botao-pausar"
                    >
                        Pausar
                    </button>

                </div>

                </aside>

            </section>

        </main>

    `;

    const botaoModo =
        document.querySelector<HTMLButtonElement>(
            "#alternar-modo"
        );

    if (botaoModo) {

        const modoSalvo =
            localStorage.getItem("modo");

        botaoModo.textContent =
            modoSalvo === "claro"
                ? "☀️"
                : "🌙";
    }

    botaoModo?.addEventListener(
        "click",
        () => {

            const modoClaro =
                document.body.classList.toggle(
                    "modo-claro"
                );

            localStorage.setItem(
                "modo",
                modoClaro ? "claro" : "escuro"
            );

            if (botaoModo) {

                botaoModo.textContent =
                    modoClaro
                        ? "☀️"
                        : "🌙";
            }
        }
    );

    iniciarCronometro();

    let jogoPausado = false;

    const botaoVoltar =
        document.querySelector<HTMLButtonElement>(
            "#voltar"
        );

    const botaoPausar =
        document.querySelector<HTMLButtonElement>(
            "#pausar"
        );

    botaoVoltar?.addEventListener(
        "click",
        () => {

            pararCronometro();

            window.location.href = "/";
        }
    );

    function alternarPausa(): void {

        jogoPausado = !jogoPausado;

        const celulas =
            document.querySelectorAll<HTMLElement>(
                ".celula"
            );

        const entradas =
            document.querySelectorAll<HTMLInputElement>(
                ".entrada"
            );

        if (jogoPausado) {

            pararCronometro();

            // Esconde os números fixos.
            celulas.forEach((celula) => {

                if (
                    celula.classList.contains(
                        "numero-fixo"
                    )
                ) {

                    celula.dataset.numeroOriginal =
                        celula.textContent ?? "";

                    celula.textContent = "";
                }
            });

            // Esconde os números digitados.
            entradas.forEach((entrada) => {

                entrada.dataset.valorOriginal =
                    entrada.value;

                entrada.value = "";

                entrada.disabled = true;
            });

            botaoPausar!.textContent =
                "Continuar";

        } else {

            // Restaura os números fixos.
            celulas.forEach((celula) => {

                if (
                    celula.classList.contains(
                        "numero-fixo"
                    )
                ) {

                    celula.textContent =
                        celula.dataset.numeroOriginal ?? "";
                }
            });

            // Restaura os números digitados.
            entradas.forEach((entrada) => {

                entrada.value =
                    entrada.dataset.valorOriginal ?? "";

                entrada.disabled = false;
            });

            botaoPausar!.textContent =
                "Pausar";

            iniciarCronometro();
        }
    }

    botaoPausar?.addEventListener(
        "click",
        alternarPausa
    );

    const elementoTabuleiro =
        document.querySelector<HTMLDivElement>(
            "#tabuleiro"
        );

    const botaoResolver =
    document.querySelector<HTMLButtonElement>(
        "#resolver"
    );

    botaoResolver?.addEventListener(
        "click",
        () => {

            pararCronometro();

            const celulas =
                document.querySelectorAll<HTMLElement>(
                    ".celula"
                );

            celulas.forEach((celula, indice) => {

                const linha =
                    Number(celula.dataset.linha);

                const coluna =
                    Number(celula.dataset.coluna);

                if (
                    tabuleiro[linha][coluna] === 0
                ) {

                    const entrada =
                        celula.querySelector<HTMLInputElement>(
                            ".entrada"
                        );

                    if (entrada) {

                        entrada.value =
                            solucao[linha][coluna].toString();

                        entrada.classList.remove(
                            "entrada-invalida"
                        );

                        entrada.classList.add(
                            "entrada-valida"
                        );

                        tabuleiro[linha][coluna] =
                            solucao[linha][coluna];
                    }
                }
            });

            verificarRegioesConcluidas();

            verificarConclusao();
        }
    );

    if (elementoTabuleiro) {


        for (let linha = 0; linha < 9; linha++) {

            for (let coluna = 0; coluna < 9; coluna++) {


                const valor =
                    tabuleiro[linha][coluna];

                const celula =
                    document.createElement("div");


                celula.classList.add("celula");

                celula.dataset.linha =
                    linha.toString();

                celula.dataset.coluna =
                    coluna.toString();

                // NÚMERO ORIGINAL DO SUDOKU
                if (valor !== 0) {

                    celula.textContent =
                        valor.toString();

                    celula.classList.add(
                        "numero-fixo"
                    );

                }

                // CÉLULA QUE O JOGADOR PODE PREENCHER
                else {

                    const entrada =
                        document.createElement("input");

                    entrada.type = "text";

                    entrada.maxLength = 1;

                    entrada.inputMode = "numeric";

                    entrada.classList.add(
                        "entrada"
                    );

                    entrada.addEventListener(
                        "input",
                        () => {

                            const numero =
                                Number(entrada.value);

                            // Permite somente números de 1 a 9.
                            if (
                                !Number.isInteger(numero) ||
                                numero < 1 ||
                                numero > 9
                            ) {

                                entrada.value = "";

                                tabuleiro[linha][coluna] = 0;

                                entrada.classList.remove(
                                    "entrada-invalida"
                                );

                                return;
                            }

                            // Verifica se o número respeita
                            // linha, coluna e bloco 3x3.
                            const movimentoPermitido =
                                movimentoValido(
                                    tabuleiro,
                                    linha,
                                    coluna,
                                    numero
                                );

                            // Verifica se o número é a resposta
                            // correta daquela posição.
                            const respostaCorreta =
                                solucao[linha][coluna] === numero;

                            // O número só é aceito quando atende
                            // às duas condições.
                            if (
                                movimentoPermitido &&
                                respostaCorreta
                            ) {

                                tabuleiro[linha][coluna] =
                                    numero;

                                ultimaLinhaPreenchida = linha;
                                ultimaColunaPreenchida = coluna;

                                entrada.classList.remove(
                                    "entrada-invalida"
                                );

                                entrada.classList.add(
                                    "entrada-valida"
                                );

                                acertos++;

                                const elementoAcertos =
                                    document.querySelector<HTMLElement>(
                                        "#acertos"
                                    );

                                if (elementoAcertos) {

                                    elementoAcertos.textContent =
                                        acertos.toString();

                                }

                                verificarRegioesConcluidas();

                                verificarConclusao();

                            } else {

                                entrada.classList.remove(
                                    "entrada-valida"
                                );

                                entrada.classList.add(
                                    "entrada-invalida"
                                );

                                // Não colocamos um número incorreto
                                // dentro do tabuleiro.
                                tabuleiro[linha][coluna] = 0;

                                erros++;

                                const elementoErros =
                                    document.querySelector<HTMLElement>(
                                        "#erros"
                                    );

                                if (elementoErros) {

                                    elementoErros.textContent =
                                        erros.toString();

                                }

                            }
                        }
                    );

                    celula.appendChild(
                        entrada
                    );
                }

                elementoTabuleiro.appendChild(
                    celula
                );
            }
        }

    }

}