import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Carrito } from '../../core/modelo/carrito';
import { CommonModule } from '@angular/common';
import { FichaComponent } from '../ficha/ficha.component';
import { DatabaseService } from '../../services/database.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent implements OnInit{
  carrito: { evento: string; fecha: string; tipo: string; cantidad: number; precio: number }[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    const storedCarrito = localStorage.getItem('carrito');
    if (storedCarrito) {
      this.carrito = JSON.parse(storedCarrito);
    }
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + item.precio, 0);
  }

  confirmarCompra(): void {
    console.log('Compra confirmada:', this.carrito);
    alert('Gracias por tu compra.');
    this.carrito = [];
    localStorage.removeItem('carrito');
  }
}