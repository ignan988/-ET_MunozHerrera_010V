import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EventoGlobal } from 'src/interfaces/eventos'; 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApicrudEventosService {
  constructor(private http: HttpClient) {}

  
  getEventosGlobales(): Observable<EventoGlobal[]> {
    return this.http.get<EventoGlobal[]>(`${environment.apiUrl}/eventosGlobales`)
      .pipe(
        catchError(this.handleError)
      );
  }


  addEvento(evento: EventoGlobal): Observable<EventoGlobal> {
    return this.http.post<EventoGlobal>(`${environment.apiUrl}/eventosGlobales`, evento)
      .pipe(
        catchError(this.handleError)
      );
  }

 
  deleteEvento(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/eventosGlobales/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

 
  updateEvento(evento: EventoGlobal): Observable<EventoGlobal> {
    return this.http.put<EventoGlobal>(`${environment.apiUrl}/eventosGlobales/${evento.id}`, evento)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: any): Observable<never> {
    console.error('Error en la API:', error);
    return throwError(() => new Error(error.message || 'Error desconocido'));
  }
}
