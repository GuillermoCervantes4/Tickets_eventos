import { Component, OnInit } from '@angular/core';
import { Evento } from '../../core/modelo/evento';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../../services/database.service';
import { AddComponent } from '../add/add.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,AddComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  eventos: Evento[] = [];
  eventosDestacados: Evento[] = [];  // Eventos destacados
  eventosNoDestacados: Evento[] = []; // Eventos no destacados
  eventosSinDestacado: Evento[] = []; // Eventos sin el campo "destacado"

  constructor(private db: DatabaseService) {}

  ngOnInit(): void {
    this.getEventos();
  }

  getEventos(): void {
    this.db.fetchLocalCollection('datos').subscribe({
      next: (data: Evento[]) => {
        this.eventos = data;
        // Filtrar eventos destacados 
        this.eventosDestacados = data.filter(evento => evento.destacado === true);
        // Filtrar eventos no destacados 
        this.eventosNoDestacados = data.filter(evento => evento.destacado === false);
        // Filtrar eventos sin dato dedestacado
        this.eventosSinDestacado = data.filter(evento => evento.destacado == null || evento.destacado === undefined);

        console.log('Eventos cargados:', this.eventos);
        console.log('Eventos destacados:', this.eventosDestacados);
        console.log('Eventos no destacados:', this.eventosNoDestacados);
        console.log('Eventos sin destacado:', this.eventosSinDestacado);

        // Inserción en Firestore
        this.db.fetchLocalCollection('datos')
          .subscribe((res: any) => {
            res.forEach((item: any) => {
              this.db.addFirestoreDocument('eventos', item);
            });
          });
      },
      error: (e: any) => {
        console.error('Error al cargar eventos:', e);
      }
    });
  }

  trackById(index: number, item: Evento): any {
    return item.id;
  }
}
