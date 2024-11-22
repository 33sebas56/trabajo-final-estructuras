import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  iniciarSesion() {
    const usuario = this.authService.autenticarUsuario(this.username, this.password);
    if (usuario) {
      if (usuario.role === 'usuario') {
        this.router.navigate(['/user']); // Redirige a la vista de pedidos para usuarios
      } else if (usuario.role === 'trabajador') {
        this.router.navigate(['/trabajador']); // Redirige a la vista de trabajador
      }
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  }

  irARegistro() {
    this.router.navigate(['/registro']);
  }
}
