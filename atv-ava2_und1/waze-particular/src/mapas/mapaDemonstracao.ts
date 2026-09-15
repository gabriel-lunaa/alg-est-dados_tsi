import { Mapa } from "../estruturas/mapa";
import { TabuleiroMapa } from "../estruturas/tabuleiroMapa";
import type { Endereco } from "../tipos/endereco";
import type { PontoMapa } from "../tipos/pontoMapa";

export function criarMapaDemonstracao(): Mapa {
    const mapa = new Mapa();

    const tabuleiro = new TabuleiroMapa(
        16,
        12
    );

    /*
     * RUAS HORIZONTAIS
     */

    for (let x = 0; x < 16; x++) {
        tabuleiro.definirRua(x, 2);
        tabuleiro.definirRua(x, 5);
        tabuleiro.definirRua(x, 8);
        tabuleiro.definirRua(x, 10);
    }

    /*
     * RUAS VERTICAIS
     */

    for (let y = 0; y < 12; y++) {
        tabuleiro.definirRua(3, y);
        tabuleiro.definirRua(7, y);
        tabuleiro.definirRua(11, y);
        tabuleiro.definirRua(14, y);
    }

    /*
     * CASAS
     */

    const casas: number[][] = [
        [0, 0],
        [1, 0],
        [4, 0],
        [5, 0],
        [8, 0],
        [9, 0],
        [12, 0],
        [13, 0],

        [0, 1],
        [1, 1],
        [4, 1],
        [5, 1],
        [8, 1],
        [9, 1],
        [12, 1],
        [13, 1],

        [0, 3],
        [1, 3],
        [4, 3],
        [5, 3],
        [8, 3],
        [9, 3],
        [12, 3],
        [13, 3],

        [0, 4],
        [1, 4],
        [4, 4],
        [5, 4],
        [8, 4],
        [9, 4],
        [12, 4],
        [13, 4],

        [0, 6],
        [1, 6],
        [8, 6],
        [9, 6],
        [12, 6],
        [13, 6],

        [0, 7],
        [1, 7],
        [4, 7],
        [5, 7],
        [8, 7],
        [9, 7],
        [12, 7],
        [13, 7],

        [0, 9],
        [1, 9],
        [4, 9],
        [5, 9],
        [8, 9],
        [9, 9],
        [12, 9],
        [13, 9],

        [0, 11],
        [1, 11],
        [4, 11],
        [5, 11],
        [8, 11],
        [9, 11],
        [12, 11],
        [13, 11]
    ];

    for (
        let indice = 0;
        indice < casas.length;
        indice++
    ) {
        const casa = casas[indice];

        tabuleiro.definirCasa(
            casa[0],
            casa[1]
        );
    }

    /*
     * PRÉDIOS
     */

    tabuleiro.definirPredio(12, 1);
    tabuleiro.definirPredio(13, 1);
    tabuleiro.definirPredio(12, 3);
    tabuleiro.definirPredio(13, 3);
    tabuleiro.definirPredio(8, 6);
    tabuleiro.definirPredio(9, 6);

    /*
     * PRAÇA
     */

    tabuleiro.definirPraca(4, 6);
    tabuleiro.definirPraca(5, 6);
    tabuleiro.definirPraca(4, 7);
    tabuleiro.definirPraca(5, 7);

    /*
     * PONTOS DE INTERESSE
     *
     * Os pontos ficam fora das ruas.
     * O acesso é feito pelo quadrinho de rua
     * indicado na posição do endereço.
     */

    const pracaCentral: PontoMapa = {
        id: 1,
        nome: "Praça Central",
        posicao: {
            x: 4,
            y: 6
        },
        endereco: {
            nomeRua: "Rua Central",
            numero: 100,
            posicao: {
                x: 3,
                y: 6
            }
        }
    };

    const farmaciaSaude: PontoMapa = {
        id: 2,
        nome: "Farmácia Saúde",
        posicao: {
            x: 10,
            y: 4
        },
        endereco: {
            nomeRua: "Avenida Norte",
            numero: 210,
            posicao: {
                x: 11,
                y: 4
            }
        }
    };

    const escolaMunicipal: PontoMapa = {
        id: 3,
        nome: "Escola Municipal",
        posicao: {
            x: 6,
            y: 7
        },
        endereco: {
            nomeRua: "Rua Escolar",
            numero: 305,
            posicao: {
                x: 7,
                y: 8
            }
        }
    };

    const hospitalMunicipal: PontoMapa = {
        id: 4,
        nome: "Hospital Municipal",
        posicao: {
            x: 13,
            y: 7
        },
        endereco: {
            nomeRua: "Avenida Hospitalar",
            numero: 410,
            posicao: {
                x: 14,
                y: 8
            }
        }
    };

    /*
     * REGISTRA OS PONTOS NO MAPA
     */

    mapa.adicionarPonto(pracaCentral);
    mapa.adicionarPonto(farmaciaSaude);
    mapa.adicionarPonto(escolaMunicipal);
    mapa.adicionarPonto(hospitalMunicipal);

    /*
     * ENDEREÇOS
     */

    const enderecoPracaCentral: Endereco =
        pracaCentral.endereco;

    const enderecoFarmaciaSaude: Endereco =
        farmaciaSaude.endereco;

    const enderecoEscolaMunicipal: Endereco =
        escolaMunicipal.endereco;

    const enderecoHospitalMunicipal: Endereco =
        hospitalMunicipal.endereco;

    mapa.adicionarEndereco(
        enderecoPracaCentral
    );

    mapa.adicionarEndereco(
        enderecoFarmaciaSaude
    );

    mapa.adicionarEndereco(
        enderecoEscolaMunicipal
    );

    mapa.adicionarEndereco(
        enderecoHospitalMunicipal
    );

    /*
     * CONEXÕES LEGADAS
     *
     * Mantidas temporariamente para compatibilidade
     * com a estrutura anterior do projeto.
     */

    mapa.adicionarConexao({
        origem: {
            x: 3,
            y: 6
        },
        destino: {
            x: 11,
            y: 5
        },
        distancia: 280,
        nivelTransito: "livre"
    });

    mapa.adicionarConexao({
        origem: {
            x: 11,
            y: 5
        },
        destino: {
            x: 14,
            y: 8
        },
        distancia: 240,
        nivelTransito: "livre"
    });

    mapa.adicionarConexao({
        origem: {
            x: 3,
            y: 6
        },
        destino: {
            x: 7,
            y: 8
        },
        distancia: 180,
        nivelTransito: "intenso"
    });

    mapa.adicionarConexao({
        origem: {
            x: 7,
            y: 8
        },
        destino: {
            x: 14,
            y: 8
        },
        distancia: 260,
        nivelTransito: "livre"
    });

    mapa.definirTabuleiro(tabuleiro);

    return mapa;
}