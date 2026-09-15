export type OrientacaoRua = "horizontal" | "vertical";

export interface Rua {
    id: number;
    nome: string;
    orientacao: OrientacaoRua;
}
