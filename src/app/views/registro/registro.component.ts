import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  username: string = '';
  password: string = '';
  role: string = 'usuario';

  constructor(private router: Router, private authService: AuthService) {}

  registrarse() {
    const registrado = this.authService.registrarUsuario(this.username, this.password, this.role);
    if (registrado) {
      alert('Registro exitoso. Por favor, inicia sesión.');
      this.router.navigate(['/login']);
    } else {
      alert('El usuario ya existe.');
      this.username = '';
      this.password = '';
      this.role = 'usuario';
    }
  }

  irALogin() {
    this.router.navigate(['/login']);
  }
}