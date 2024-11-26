import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { EventoGlobal } from '../../interfaces/eventos';
import { Users } from '../../interfaces/users';





@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  eventosGlobales: EventoGlobal[] = [];
  usuario: Users | undefined;
  eventoAgregado: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.cargarEventosGlobales();
    this.cargarUsuario();
  }

  cargarEventosGlobales() {
    this.authService.getAllEventosGlobales().subscribe(
      (eventos: EventoGlobal[]) => {
        this.eventosGlobales = eventos;
      },
      (error) => {
        console.error('Error al cargar eventos globales:', error);
      }
    );
  }

  cargarUsuario() {
    const username = sessionStorage.getItem('username');
    if (username) {
      this.authService.getUsuarioByUsername(username).subscribe(
        (usuarios: Users[]) => {
          if (usuarios.length > 0) {
            const usuario = usuarios[0]; 
            this.usuario = usuario;
  
            
            this.eventoAgregado = usuario.eventos ? usuario.eventos.length > 0 : false;
          } else {
            console.warn('Usuario no encontrado en la API.');
          }
        },
        (error) => {
          console.error('Error al cargar usuario:', error);
        }
      );
    } else {
      console.warn('No se encontró un username en sessionStorage.');
    }
  }
  

  agregarEvento(evento: EventoGlobal) {
    if (this.usuario && !this.eventoAgregado) {
     
      this.usuario.eventos = this.usuario.eventos || []; 
      this.usuario.eventos.push(evento);

      this.authService.updateUsuario(this.usuario).subscribe(
        (updatedUser: Users) => {
          this.usuario = updatedUser;
          this.eventoAgregado = true;
          alert('Evento agregado exitosamente.');
        },
        (error) => {
          console.error('Error al agregar evento:', error);
          alert('Error al agregar evento.');
        }
      );
    } else {
      alert('Solo puedes agregar un evento.');
    }
  }
}
