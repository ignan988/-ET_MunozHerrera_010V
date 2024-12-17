import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; 
import { AlertController, MenuController } from '@ionic/angular'; 
import { EventoGlobal } from 'src/interfaces/eventos'; 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  
  evento: EventoGlobal = {
    id: '', 
    nombre: '',
    fecha: '',
    descripcion: '',
    ubicacion: '',
    participantes: [],
    activo: true, 
    imagen: '',
  };

  constructor(
    private authService: AuthService, 
    private alertCtrl: AlertController, 
    private menuController: MenuController 
  ) {}

  
  mostrarMenu() {
    this.menuController.open('first'); 
  }

  
  async addEvent() {
    try {
      
      await this.authService.addEventoGlobal(this.evento).toPromise();

      
      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'Evento agregado correctamente.',
        buttons: ['OK'],
      });
      await alert.present();

     
      this.evento = {
        id: '',
        nombre: '',
        fecha: '',
        descripcion: '',
        ubicacion: '',
        participantes: [],
        activo: true,
        imagen: '',
      };
    } catch (error) {
      
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Hubo un problema al agregar el evento.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
