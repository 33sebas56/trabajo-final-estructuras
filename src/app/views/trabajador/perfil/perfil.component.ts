import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  trabajador = {
    nombre: '',
    profesion: '',
    edad: null,
    comentario: '',
    email: '',
  };
  usuarioActualEmail = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const usuarioActual = this.authService.obtenerUsuarioActual();
    if (usuarioActual) {
      this.usuarioActualEmail = usuarioActual.username;

      const usuarioData = localStorage.getItem(`perfil-${this.usuarioActualEmail}`);
      if (usuarioData) {
        this.trabajador = JSON.parse(usuarioData);
      }
    } else {
      alert('No se encontró un usuario activo.');
      this.router.navigate(['/login']);
    }
  }

  guardarCambios() {
    if (this.usuarioActualEmail) {
      localStorage.setItem(`perfil-${this.usuarioActualEmail}`, JSON.stringify(this.trabajador));
      alert('Cambios guardados correctamente.');
      this.router.navigate(['/trabajador']); 
    } else {
      alert('No se pudo guardar el perfil. Intenta nuevamente.');
    }
  }

  volver() {
    this.router.navigate(['/trabajador']); 
  }
  
}