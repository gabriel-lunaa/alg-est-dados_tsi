import type { Posicao } from "./posicao";
import type { Endereco } from "./endereco";

export interface PontoMapa {
    id: number;
    nome: string;
    posicao: Posicao;
    endereco: Endereco;
}
