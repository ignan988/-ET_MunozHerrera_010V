import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

interface Menu {
  icon: string;
  name: string;
  redirecTo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  menu: Menu[] = [
    {
      icon: 'people-outline',
      name: 'Mi Perfil',
      redirecTo: '/tabs/tab4',
    },
    {
      icon: 'power-outline',
      name: 'Cerrar sesión',
      redirecTo: '/comienzo',
    },
  ];

  isComienzoPage: boolean = false;
  isCrearUsuarioPage: boolean = false;


  hasLogout: boolean = false;

  constructor(private router: Router) {
    
    this.hasLogout = this.menu.some(item => item.name === 'Cerrar sesión');

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isComienzoPage = event.url === '/comienzo';
        this.isCrearUsuarioPage = event.url === '/crear-usuario';
      }
    });
  }

  logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('ingresado');

    
    this.router.navigate(['/comienzo']);
  }
}
