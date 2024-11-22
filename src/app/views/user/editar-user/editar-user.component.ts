import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-user',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './editar-user.component.html',
  styleUrl: './editar-user.component.css'
})
export class EditarUserComponent implements OnInit {
  usuario = {
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  };
  usuarioActualEmail = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const email = localStorage.getItem('usuarioActual');
    if (email) {
      this.usuarioActualEmail = email;

      const usuarioData = localStorage.getItem(`perfil-${email}`);
      if (usuarioData) {
        this.usuario = JSON.parse(usuarioData);
      }
    } else {
      alert('No se encontró un usuario activo.');
      this.router.navigate(['/login']);
    }
  }

  guardarCambios(): void {
    if (this.usuarioActualEmail) {
      localStorage.setItem(`perfil-${this.usuarioActualEmail}`, JSON.stringify(this.usuario));
      alert('Perfil actualizado correctamente.');
      this.router.navigate(['/user']); 
    } else {
      alert('No se pudo actualizar el perfil. Intenta de nuevo.');
    }
  }
  volver() {
    this.router.navigate(['/user']);
  }
}