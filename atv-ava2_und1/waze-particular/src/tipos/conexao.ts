import type { Posicao } from "./posicao";

export type NivelTransito =
    | "livre"
    | "moderado"
    | "intenso";

export interface Conexao {
    origem: Posicao;
    destino: Posicao;
    distancia: number;
    nivelTransito: NivelTransito;
}
