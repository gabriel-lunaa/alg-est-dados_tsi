import type { ElementoFila } from "../tipos/elementoFila";

export class Fila {
    private elementos: ElementoFila[] = [];
    private indiceInicio: number = 0;
    private indiceFinal: number = 0;

    public adicionar(elemento: ElementoFila): void {
        this.elementos[this.indiceFinal] = elemento;
        this.indiceFinal++;
    }

    public remover(): ElementoFila | null {
        if (this.indiceInicio >= this.indiceFinal) {
            return null;
        }

        const elemento = this.elementos[this.indiceInicio];
        this.indiceInicio++;

        return elemento;
    }

    public estaVazia(): boolean {
        return this.indiceInicio >= this.indiceFinal;
    }

    public obterQuantidade(): number {
        return this.indiceFinal - this.indiceInicio;
    }
}
