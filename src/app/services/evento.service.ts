import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../core/modelo/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private http = inject(HttpClient);
  private url: string = 'src/json/datos.json';

  getEvento(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.url);
  }
  
}

// export class EventoService {
//   private readonly eventosUrl = 'src/json/datos.json'; 

//   constructor(private http: HttpClient) {}

//   getEvento(): Observable<Evento[]> {
//     return this.http.get<Evento[]>(this.eventosUrl);
//   }
// }

