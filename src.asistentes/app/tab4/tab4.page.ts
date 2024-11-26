import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Users } from 'src/interfaces/users';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  usuario: Users | undefined; 
  editForm: FormGroup;
  previewImage: string | null = null; 

  constructor(private authService: AuthService, private fb: FormBuilder) {
   
    this.editForm = this.fb.group({
      username: [{ value: '', disabled: true }, Validators.required], 
      email: ['', [Validators.required, Validators.email]], 
      rut: ['', [Validators.required]], 
    });
  }

  ngOnInit() {
    this.loadUserProfile(); 
  }

 
  loadUserProfile() {
    const username = sessionStorage.getItem('username'); 
    console.log('Username obtenido de sessionStorage:', username);

    if (username) {
      this.authService.getUsuarioByUsername(username).subscribe(
        (data: Users[]) => {
          console.log('Datos obtenidos de la API:', data);
          
          if (data.length > 0) {
            this.usuario = data[0]; 
            
            this.editForm.patchValue({
              username: this.usuario.username || '',
              email: this.usuario.email || '',
              rut: this.usuario.rut || '',
            });
            console.log('Formulario actualizado con:', this.editForm.value);
          } else {
            console.warn('No se encontró ningún usuario con ese username.');
          }
        },
        (error) => {
          console.error('Error al cargar el perfil:', error);
          alert('No se pudo cargar la información del perfil.');
        }
      );
    } else {
      console.warn('No se encontró un username en sessionStorage.');
    }
  }

  
  saveChanges() {
    if (this.editForm.valid) {
      const updatedUser: Users = {
        ...this.usuario,
        ...this.editForm.getRawValue(),
      };

      this.authService.updateUsuario(updatedUser).subscribe(
        (response: Users) => {
          this.usuario = response;
          alert('Perfil actualizado correctamente.');
        },
        (error) => {
          console.error('Error al actualizar el perfil:', error);
          alert('Hubo un problema al guardar los cambios.');
        }
      );
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

  
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = e.target?.result as string;
        console.log('Imagen cargada como vista previa:', this.previewImage);
      };
      reader.readAsDataURL(file);
    }
  }
}
