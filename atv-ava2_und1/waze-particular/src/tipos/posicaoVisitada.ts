import type { PontoMapa } from "./pontoMapa";

export interface PosicaoVisitada {
    ponto: PontoMapa;
    visitada: boolean;
    pontoAnterior: PontoMapa | null;
}