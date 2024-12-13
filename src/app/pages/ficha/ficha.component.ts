// src/app/pages/ficha/ficha.component.ts
import { Component, OnInit } from '@angular/core';
import { Evento } from '../../core/modelo/evento';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../../services/database.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-ficha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.scss'] // Corregido a 'styleUrls'
})
export class FichaComponent implements OnInit {
  
  id: number | null = null; 
  data!: Evento; 
  evento: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private db: DatabaseService
  ) {}

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.params['id'];
    this.id = idParam ? Number(idParam) : null;
    this.cargarEvento();
  }

  cargarEvento(): void {
    this.db.fetchLocalCollection('datos').subscribe({
      next: (eventos: Evento[]) => {
        if (this.id === null) {
          console.error('ID del evento no proporcionado');
          return;
        }

        const eventoEncontrado = eventos.find((evento) => evento.id === this.id);
        if (eventoEncontrado) {
          this.data = eventoEncontrado; 
        } else {
          console.error('Evento no encontrado');
        }
      },
      error: (err) => console.error('Error al cargar eventos:', err),
    });
  }
}