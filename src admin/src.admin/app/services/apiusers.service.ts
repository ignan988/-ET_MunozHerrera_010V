
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiusersService {

  private apiUrl = 'http://localhost:3000/usuarios'; 

  constructor(private http: HttpClient) { }

  agregarUsuario(nuevoUsuario: any): Observable<any> {
    return this.http.post(this.apiUrl, nuevoUsuario);
  }
}
