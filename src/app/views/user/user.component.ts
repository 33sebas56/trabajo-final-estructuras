import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  mostrarMenu: boolean = false;
  usuario = {
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  };
  usuarioActualEmail = '';

  constructor(private router: Router, private authService: AuthService) {}

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

  irAEditarPerfil() {
    this.router.navigate(['/editar-user']);
  }

  irAPedidos() {
    this.router.navigate(['/pedidos']);
  }

  irAHistorialPedidos() {
    this.router.navigate(['/historialPedidos']);
  }
  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }
}
