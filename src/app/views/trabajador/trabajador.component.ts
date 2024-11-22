import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule,CommonModule],
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.css']
})
export class TrabajadorComponent implements OnInit {
  mostrarMenu: boolean = false;
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

  irAEditarPerfil() {
    this.router.navigate(['/editar-perfil']);
  }

  irAGestionarMenu() {
    this.router.navigate(['/menu']);
  }

  irAListarPedidos() {
    this.router.navigate(['/listadoPedidos']);
  }

  guardarPerfil() {
    if (this.usuarioActualEmail) {
      
      localStorage.setItem(`perfil-${this.usuarioActualEmail}`, JSON.stringify(this.trabajador));
      alert('Perfil actualizado correctamente.');
    } else {
      alert('No se pudo guardar el perfil. Intenta nuevamente.');
    }
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }
}
