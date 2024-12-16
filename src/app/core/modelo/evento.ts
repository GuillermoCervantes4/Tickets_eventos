export interface Ticket {
    precio: number;
    tipo: string;
  }
export class Evento {
    id!: number;
    nombre!: string;
    lugar!: string;
    fecha!: string;
    descripcion!: string;
    categorias!: string[];
    genero!: string;
    tickets!: Ticket[];
    cantidad_de_tickets!: number;
    destacado!: boolean;
}