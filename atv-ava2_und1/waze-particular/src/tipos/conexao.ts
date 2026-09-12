import type { Posicao } from "./posicao";

export interface Conexao {
    origem: Posicao;
    destino: Posicao;
    distancia: number;
}
