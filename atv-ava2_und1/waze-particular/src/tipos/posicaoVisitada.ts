import type { Posicao } from "./posicao";

export interface PosicaoVisitada {
    posicao: Posicao;
    visitada: boolean;
    posicaoAnterior: Posicao | null;
}
