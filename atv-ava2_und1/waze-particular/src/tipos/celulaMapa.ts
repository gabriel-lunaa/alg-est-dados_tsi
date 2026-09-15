import type { PontoMapa } from "./pontoMapa";

export type TipoCelulaMapa =
    | "vazio"
    | "terreno"
    | "rua"
    | "casa"
    | "predio"
    | "praca"
    | "estabelecimento";

export type NivelTransito =
    | "livre"
    | "moderado"
    | "intenso";

export interface CelulaMapa {
    tipo: TipoCelulaMapa;
    ponto: PontoMapa | null;
    transitavel: boolean;
    nivelTransito: NivelTransito | null;
}
