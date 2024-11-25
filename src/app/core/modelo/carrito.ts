import { Evento } from "./evento";

export class Carrito {
    evento: Evento;
    cantidad: number;

    constructor(evento: Evento, cantidad: number = 1){
        this.evento = evento;
        this.cantidad = cantidad;
    }
}
