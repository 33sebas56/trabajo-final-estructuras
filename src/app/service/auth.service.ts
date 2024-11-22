import { Injectable } from '@angular/core';

interface Usuario {
  username: string;
  password: string;
  role: string;
  nombre?: string;
  profesion?: string;
  edad?: number | null; // Asegúrate de incluir `null` aquí
  comentario?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuariosKey = 'usuarios';
  private usuarioActualKey = 'usuarioActual';
  private usuarios: Usuario[] = [];

  constructor() {
    const usuariosGuardados = localStorage.getItem(this.usuariosKey);
    this.usuarios = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
  }

  registrarUsuario(username: string, password: string, role: string): boolean {
    const usuarioExistente = this.usuarios.find((user) => user.username === username);
    if (usuarioExistente) {
      return false;
    }

    const nuevoUsuario: Usuario = { username, password, role };
    this.usuarios.push(nuevoUsuario);

    localStorage.setItem(this.usuariosKey, JSON.stringify(this.usuarios));
    return true;
  }

  autenticarUsuario(username: string, password: string): Usuario | null {
    const usuario = this.usuarios.find(
      (user) => user.username === username && user.password === password
    );
    if (usuario) {
      localStorage.setItem(this.usuarioActualKey, JSON.stringify(usuario));
      return usuario;
    }
    return null;
  }

  obtenerUsuarioActual(): Usuario | null {
    const usuarioActual = localStorage.getItem(this.usuarioActualKey);
    return usuarioActual ? JSON.parse(usuarioActual) : null;
  }

  actualizarUsuarioActual(usuarioActualizado: Usuario): void {
    const index = this.usuarios.findIndex((user) => user.username === usuarioActualizado.username);

    if (index !== -1) {
      this.usuarios[index] = usuarioActualizado;
      localStorage.setItem(this.usuariosKey, JSON.stringify(this.usuarios));
      localStorage.setItem(this.usuarioActualKey, JSON.stringify(usuarioActualizado));
    }
  }

  cerrarSesion(): void {
    localStorage.removeItem(this.usuarioActualKey);
  }
}