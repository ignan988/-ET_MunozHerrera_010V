import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {
  private storageKey = 'almacen'; 

  constructor() {
    
    if (!localStorage.getItem(this.storageKey)) {
      const initialData = {
        usuarios: [
          {
            id: '1',
            username: 'usuario1',
            email: 'usuario1@mail.cl',
            password: 'duoc1234',
            celular: '+56973370953',
            isactive: true,
            foto: ''
          },
          {
            id: '2',
            username: 'usuario2',
            email: 'usuario2@mail.cl',
            password: 'maipu1234',
            celular: '+56999785873',
            isactive: true,
            foto: ''
          },
          {
            id: '3',
            username: 'nacho0',
            email: 'usuario2@mail.cl',
            password: 'nacho1234',
            celular: '+56999785873',
            isactive: true,
            foto: ''
          }
        ]
      };
      this.writeUsuarios(initialData);
    }
  }

  
  readUsuarios(): any {
    return JSON.parse(localStorage.getItem(this.storageKey) || '{}');
  }

  
  writeUsuarios(usuarios: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(usuarios));
  }

  
  getUsuarios(): any[] {
    return this.readUsuarios().usuarios || [];
  }

  
  getUsuario(id: string): any {
    const usuarios = this.getUsuarios();
    return usuarios.find((usuario) => usuario.id === id);
  }

  
  updateUsuario(usuario: any): void {
    const usuarios = this.getUsuarios();
    const index = usuarios.findIndex((u) => u.id === usuario.id);
    if (index !== -1) {
      usuarios[index] = usuario; 
    }
    this.writeUsuarios({ usuarios }); 
  }

  
  deleteUsuario(id: string): void {
    let usuarios = this.getUsuarios();
    usuarios = usuarios.filter((usuario) => usuario.id !== id);
    this.writeUsuarios({ usuarios }); 
  }
}
