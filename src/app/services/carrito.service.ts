import { Injectable } from '@angular/core';
import { Carrito } from '../core/modelo/carrito';
import { Evento } from '../core/modelo/evento';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private listacarro: Carrito[] =[];
  
  getCarrito(){
    return this.listacarro;
  }


}
