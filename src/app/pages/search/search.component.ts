import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Evento } from '../../core/modelo/evento';
import { DatabaseService } from '../../services/database.service';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';  

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], 
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  eventos: Evento[] = [];
  filteredEventos: Evento[] = [];
  searchControl = new FormControl('');

  constructor(private db: DatabaseService) {}

  ngOnInit(): void {
    this.getEventos();

    this.searchControl.valueChanges.subscribe((searchTerm: string | null) => {
      const term = searchTerm || ''; 
      this.filteredEventos = this.filterEventos(term);
    });
  }

  getEventos(): void {
    this.db.fetchLocalCollection('datos').subscribe({
      next: (data: Evento[]) => {
        this.eventos = data;
        this.filteredEventos = data; 
        console.log('Eventos cargados:', this.eventos);
      },
      error: (e: any) => {
        console.error('Error al cargar eventos:', e);
      }
    });
  }

  filterEventos(searchTerm: string): Evento[] {
    if (!searchTerm) {
      return this.eventos; 
    }
    return this.eventos.filter(evento =>
      evento.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.categorias[0]?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    

  }

  trackById(index: number, item: Evento): any {
    return item.id;
  }
}
