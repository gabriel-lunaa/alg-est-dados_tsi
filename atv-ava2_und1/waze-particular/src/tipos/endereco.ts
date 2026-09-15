import type { Posicao } from "./posicao";

export interface Endereco {
    nomeRua: string;
    numero: number;
    posicao: Posicao;
}
