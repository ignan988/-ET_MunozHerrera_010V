import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Users } from 'src/interfaces/users';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page {
  usuario: Users | null = null; 
  qrData: string = ''; 
  eventoSeleccionado: any = null; 
  qrVisible: boolean = false; 

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.cargarUsuario(); 
  }

 
  cargarUsuario() {
    const username = sessionStorage.getItem('username');
    if (username) {
      this.authService.getUsuarioByUsername(username).subscribe(
        (usuario: Users[]) => {
          if (usuario.length > 0) {
            this.usuario = usuario[0]; 
          }
        },
        (error) => {
          console.error('Error al cargar el usuario:', error);
        }
      );
    }
  }

  
  generarCodigoQR() {
    if (this.usuario && this.eventoSeleccionado) {
      this.qrData = JSON.stringify({
        nombreUsuario: this.usuario.username,
        rut: this.usuario.rut,
        evento: {
          nombre: this.eventoSeleccionado.nombre,
          fecha: this.eventoSeleccionado.fecha,
          lugar: this.eventoSeleccionado.lugar,
          descripcion: this.eventoSeleccionado.descripcion,
        },
      });
    } else if (this.usuario) {
      this.qrData = JSON.stringify({
        nombreUsuario: this.usuario.username,
        rut: this.usuario.rut,
        evento: 'Ningún evento seleccionado',
      });
    }
    this.qrVisible = true; 
  }

 
  seleccionarEvento(evento: any) {
    if (this.usuario) {
      
      if (!evento.participantes.includes(this.usuario.username)) {
        evento.participantes.push(this.usuario.username); 
  
        
        this.authService.updateEvento(evento).subscribe(
          (updatedEvento) => {
            console.log('Evento actualizado correctamente:', updatedEvento);
            this.eventoSeleccionado = updatedEvento; 
            this.generarCodigoQR(); 
          },
          (error) => {
            console.error('Error al actualizar el evento:', error);
          }
        );
      } else {
        alert('Ya estás registrado en este evento.');
      }
    } else {
      alert('No se encontró un usuario logueado.');
    }
  }
  
}
