import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; 
import { EventoGlobal } from 'src/interfaces/eventos'; 
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  eventos: EventoGlobal[] = []; 
  editingEvento: EventoGlobal = this.resetEvento(); 

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadEventos(); 
  }

  
  loadEventos() {
    this.authService.getAllEventosGlobales().subscribe(
      (data) => {
        console.log('Eventos cargados:', data); 
        this.eventos = data;
      },
      (error) => {
        console.error('Error al cargar eventos:', error); 
      }
    );
  }
  

  
  startEdit(evento: EventoGlobal) {
    this.editingEvento = { ...evento }; 
  }

  
  async saveEvento() {
    if (this.editingEvento) {
      try {
        await this.authService.updateEventoGlobal(this.editingEvento).toPromise();
        this.editingEvento = this.resetEvento(); 
        this.loadEventos(); 

        const alert = await this.alertCtrl.create({
          header: 'Éxito',
          message: 'El evento ha sido actualizado.',
          buttons: ['OK'],
        });
        await alert.present();
      } catch (error) {
        console.error('Error al actualizar evento:', error);
      }
    }
  }

  
  cancelEdit() {
    this.editingEvento = this.resetEvento(); 
  }

  
  async deleteEvento(eventoId: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este evento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.authService.deleteEventoGlobal(eventoId).toPromise();
              this.loadEventos(); 

              const successAlert = await this.alertCtrl.create({
                header: 'Éxito',
                message: 'El evento ha sido eliminado.',
                buttons: ['OK'],
              });
              await successAlert.present();
            } catch (error) {
              console.error('Error al eliminar evento:', error);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  
  private resetEvento(): EventoGlobal {
    return {
      id: '',
      nombre: '',
      descripcion: '',
      fecha: '',
      ubicacion: '',
      participantes: [],
      activo: true,
      imagen: ''
    };
  }
}
