import { Mapa } from "../estruturas/mapa";
import type { PontoMapa } from "../tipos/pontoMapa";
import type { Conexao } from "../tipos/conexao";

export function criarMapaDemonstracao(): Mapa {
    const mapa = new Mapa();

    const pracaCentral: PontoMapa = {
        id: 1,
        nome: "Praça Central",
        posicao: {
            x: 100,
            y: 100
        }
    };

    const biblioteca: PontoMapa = {
        id: 2,
        nome: "Biblioteca",
        posicao: {
            x: 200,
            y: 100
        }
    };

    const escola: PontoMapa = {
        id: 3,
        nome: "Escola",
        posicao: {
            x: 100,
            y: 200
        }
    };

    const hospital: PontoMapa = {
        id: 4,
        nome: "Hospital",
        posicao: {
            x: 300,
            y: 100
        }
    };

    mapa.adicionarPonto(pracaCentral);
    mapa.adicionarPonto(biblioteca);
    mapa.adicionarPonto(escola);
    mapa.adicionarPonto(hospital);

    const conexaoPracaBiblioteca: Conexao = {
        origem: pracaCentral.posicao,
        destino: biblioteca.posicao,
        distancia: 100,
        nivelTransito: "livre"
    };

    const conexaoBibliotecaHospital: Conexao = {
        origem: biblioteca.posicao,
        destino: hospital.posicao,
        distancia: 100,
        nivelTransito: "livre"
    };

    const conexaoPracaEscola: Conexao = {
        origem: pracaCentral.posicao,
        destino: escola.posicao,
        distancia: 80,
        nivelTransito: "intenso"
    };

    const conexaoEscolaHospital: Conexao = {
        origem: escola.posicao,
        destino: hospital.posicao,
        distancia: 80,
        nivelTransito: "livre"
    };

    mapa.adicionarConexao(conexaoPracaBiblioteca);
    mapa.adicionarConexao(conexaoBibliotecaHospital);
    mapa.adicionarConexao(conexaoPracaEscola);
    mapa.adicionarConexao(conexaoEscolaHospital);

    return mapa;
}
