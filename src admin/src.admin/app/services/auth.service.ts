import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserNuevo, Users } from 'src/interfaces/users';  
import { environment } from 'src/environments/environment';
import { EventoGlobal } from 'src/interfaces/eventos';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient: HttpClient) { }

  
  getAllUsers(): Observable<Users[]> {
    return this.httpclient.get<Users[]>(`${environment.apiUrl}/usuarios`);
  }

 
  getByUsername(usuario: string): Observable<Users> {
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/?username=${usuario}`);
  }

  
  IsLoggedIn(): boolean {
    return sessionStorage.getItem('username') != null;
  }

  
  PostUsuario(newUsuario: UserNuevo): Observable<UserNuevo> {
    return this.httpclient.post<UserNuevo>(`${environment.apiUrl}/usuarios`, newUsuario);
  }

  getUsuarioByUsername(username: string): Observable<Users[]> {
    return this.httpclient.get<Users[]>(`${environment.apiUrl}/usuarios?username=${username}`);
  }
  
  
 
  updateUsuario(usuario: Users): Observable<Users> {
    return this.httpclient.put<Users>(`${environment.apiUrl}/usuarios/${usuario.id}`, usuario);
}


getAllEventosGlobales(): Observable<EventoGlobal[]> {
  return this.httpclient.get<EventoGlobal[]>(`${environment.apiUrl}/eventosGlobales`);
}

  
  
addEventoGlobal(evento: EventoGlobal): Observable<EventoGlobal> {
  return this.httpclient.post<EventoGlobal>(`${environment.apiUrl}/eventosGlobales`, evento);
}


updateEventoGlobal(evento: EventoGlobal): Observable<EventoGlobal> {
  return this.httpclient.put<EventoGlobal>(`${environment.apiUrl}/eventosGlobales/${evento.id}`, evento);
}



deleteEventoGlobal(id: string): Observable<void> {
  return this.httpclient.delete<void>(`${environment.apiUrl}/eventosGlobales/${id}`);
}
updateEvento(evento: EventoGlobal): Observable<EventoGlobal> {
  return this.httpclient.put<EventoGlobal>(
    `${environment.apiUrl}/eventosGlobales/${evento.id}`,
    evento
  );
}

  
}

