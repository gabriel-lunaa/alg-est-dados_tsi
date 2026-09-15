import type { CelulaMapa } from "./celulaMapa";

export interface MapaSalvo {
    nome: string;
    largura: number;
    altura: number;
    celulas: CelulaMapa[];
}
