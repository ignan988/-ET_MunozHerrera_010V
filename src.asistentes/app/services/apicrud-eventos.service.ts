import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventoGlobal } from 'src/interfaces/eventos'; 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApicrudEventosService {
  constructor(private http: HttpClient) {}

  
  getEventosGlobales(): Observable<EventoGlobal[]> {
    return this.http.get<EventoGlobal[]>(`${environment.apiUrl}/eventosGlobales`);
  }

  
  addEvento(evento: EventoGlobal): Observable<EventoGlobal> {
    return this.http.post<EventoGlobal>(`${environment.apiUrl}/eventosGlobales`, evento);
  }

 
  deleteEvento(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/eventosGlobales/${id}`);
  }

  
  updateEvento(evento: EventoGlobal): Observable<EventoGlobal> {
    return this.http.put<EventoGlobal>(`${environment.apiUrl}/eventosGlobales/${evento.id}`, evento);
  }
}
