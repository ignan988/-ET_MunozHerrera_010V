import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserNuevo } from 'src/interfaces/users';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {
  userdata: any;

  registroForm: FormGroup;

  nuevoUsuario: UserNuevo = {
    username: '',
    email: '',
    password: '',
    rut: '', // Campo nuevo
    isactive: false,
  };

  constructor(
    private authservice: AuthService,
    private router: Router,
    private alertcontroller: AlertController,
    private fbuilder: FormBuilder
  ) {
    this.registroForm = this.fbuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      rut: new FormControl('', [Validators.required]), // Validación para el campo RUT
    });
  }

  ngOnInit() {}

  crearUsuario() {
    if (this.registroForm.valid) {
      this.authservice.getByUsername(this.registroForm.value.username).subscribe(
        (resp) => {
          this.userdata = resp;

          if (this.userdata && this.userdata.length > 0) {
            this.registroForm.reset();
            this.errorDuplicidad();
          } else {
            this.nuevoUsuario = {
              username: this.registroForm.value.username,
              password: this.registroForm.value.password,
              email: this.registroForm.value.email,
              rut: this.registroForm.value.rut, // Captura el valor del RUT
              isactive: true,
            };

            this.authservice.PostUsuario(this.nuevoUsuario).subscribe(
              (response) => {
                console.log('Usuario creado correctamente:', response);
                this.registroForm.reset();
                this.mostrarMensaje();
                this.router.navigateByUrl('/inicio');
              },
              (error) => {
                console.error('Error al crear usuario:', error);
                this.errorDuplicidad();
              }
            );
          }
        },
        (error) => {
          console.error('Error al verificar el nombre de usuario:', error);
          this.errorDuplicidad();
        }
      );
    }
  }

  async mostrarMensaje() {
    const alerta = await this.alertcontroller.create({
      header: 'Usuario Creado correctamente',
      message: 'Bienvenid@ ' + this.nuevoUsuario.username,
      buttons: ['OK'],
    });

    await alerta.present();
    await alerta.onDidDismiss();

    this.router.navigateByUrl('/comienzo');
  }

  async errorDuplicidad() {
    const alerta = await this.alertcontroller.create({
      header: 'Error',
      message: 'El usuario ' + this.nuevoUsuario.username + ' ya está registrado.',
      buttons: ['OK'],
    });
    alerta.present();
  }
}
