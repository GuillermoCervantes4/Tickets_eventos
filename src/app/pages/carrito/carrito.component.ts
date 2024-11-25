import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Carrito } from '../../core/modelo/carrito';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent implements OnInit{
  constructor(private carritoService: CarritoService) {}
  listacarrito: Carrito[] = [];
  ngOnInit(): void {
    this.getListCarrito();
  }

  getListCarrito(){
    this.listacarrito = this.carritoService.getCarrito();
  }
  trackById(index: number, item: any): any {
    return item.evento.id;  
  }
}
