import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-comienzo',
  templateUrl: './comienzo.page.html',
  styleUrls: ['./comienzo.page.scss'],
})
export class ComienzoPage implements OnInit {
  userdata: any;

  usuario = {
    id: 0,
    username: "",
    email: "",
    password: "",
    isactive: false,
  };

  loginForm: FormGroup;

  constructor(
    private authservice: AuthService,
    private router: Router,
    private alertcontroller: AlertController,
    private toast: ToastController,
    private fbuilder: FormBuilder
  ) {
    this.loginForm = this.fbuilder.group({
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit() {}

  login() {
    if (!this.loginForm.valid) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.authservice.getByUsername(username).subscribe(
      (resp) => {
        this.userdata = resp;
        console.log(this.userdata);

        if (this.userdata.length === 0) {
          this.UsuarioNoExiste();
          this.loginForm.reset();
          return;
        }

      
        this.usuario = {
          id: this.userdata[0].id,
          username: this.userdata[0].username,
          password: this.userdata[0].password,
          email: this.userdata[0].email,
          isactive: this.userdata[0].isactive,
        };

   
        if (this.usuario.password !== password) {
          this.EnviarCorreoContraseña(); 
          this.loginForm.reset();
          return;
        }

        
        if (!this.usuario.isactive) {
          this.UsuarioInactivo();
          this.loginForm.reset();
          return;
        }

        this.IniciarSesion(this.usuario);
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        alert('Ocurrió un problema al iniciar sesión.');
        this.loginForm.reset();
      }
    );
  }

  private IniciarSesion(usuario: any) {
    sessionStorage.setItem('username', usuario.username);
    sessionStorage.setItem('password', usuario.password);
    sessionStorage.setItem('ingresado', 'true');
    this.showToast('Sesión Iniciada ' + usuario.username);

    this.loginForm.reset();
    this.router.navigate(['/tabs/tab1']);
  }

  async showToast(msg: any) {
    const toast = await this.toast.create({
      message: msg,
      duration: 3000,
    });
    toast.present();
  }

  async UsuarioInactivo() {
    const alerta = await this.alertcontroller.create({
      header: 'Usuario inactivo',
      message: 'Contactar a admin@admin.cl',
      buttons: ['OK'],
    });
    alerta.present();
  }

  async EnviarCorreoContraseña() {
    const alerta = await this.alertcontroller.create({
      header: 'Contraseña Incorrecta',
      message: 'La contraseña ha sido enviada a su correo electrónico:' + this.usuario.email + '',
      buttons: ['OK'],
    });
    alerta.present();

   
    console.log(`Simulando envío de correo a: ${this.usuario.email}`);
  }

  async ErrorUsuario() {
    const alerta = await this.alertcontroller.create({
      header: 'Error..',
      message: 'Revise sus credenciales',
      buttons: ['OK'],
    });
    alerta.present();
  }

  async UsuarioNoExiste() {
    const alerta = await this.alertcontroller.create({
      header: 'No existe...',
      message: 'Debe registrarse..',
      buttons: ['OK'],
    });
    alerta.present();
  }
}
