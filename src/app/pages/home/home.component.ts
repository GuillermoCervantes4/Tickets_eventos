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
