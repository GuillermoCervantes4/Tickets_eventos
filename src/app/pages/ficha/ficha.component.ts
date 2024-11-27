import { Component, Input, OnInit } from '@angular/core';
import { Evento } from '../../core/modelo/evento';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../../services/database.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ficha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './ficha.component.html',
  styleUrl: './ficha.component.scss'
})
export class FichaComponent implements OnInit {
  eventos: Evento[] = [];

  constructor(private db: DatabaseService) {}

  ngOnInit(): void {
    this.getEventos();
  }

  getEventos(): void {
    this.db.fetchLocalCollection('datos').subscribe({
      next: (data: Evento[]) => {
        this.eventos = data;
        console.log('Eventos cargados:', this.eventos);
        this.db.fetchLocalCollection('datos')
        .subscribe((res: any)=>{
          res.forEach((items: any) => {
            this.db.addFirestoreDocument('eventos',items)
          });
        })
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

