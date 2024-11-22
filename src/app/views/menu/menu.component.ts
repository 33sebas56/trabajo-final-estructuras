import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

class Nodo<T> {
  valor: T;
  siguiente: Nodo<T> | null = null;

  constructor(valor: T) {
    this.valor = valor;
  }
}

class ListaEnlazada<T> {
  private cabeza: Nodo<T> | null = null;

  agregar(valor: T): void {
    const nuevoNodo = new Nodo(valor);
    if (!this.cabeza) {
      this.cabeza = nuevoNodo;
    } else {
      let actual = this.cabeza;
      while (actual.siguiente) {
        actual = actual.siguiente;
      }
      actual.siguiente = nuevoNodo;
    }
  }

  eliminar(indice: number): boolean {
    if (!this.cabeza) return false; // Si la lista está vacía
  
    if (indice === 0) {
      this.cabeza = this.cabeza.siguiente;
      return true;
    }
  
    let actual: Nodo<T> | null = this.cabeza; // Inicializa con la cabeza
    let previo: Nodo<T> | null = null;
    let contador = 0;
  
    while (actual && contador < indice) {
      previo = actual;
      actual = actual.siguiente;
      contador++;
    }
  
    if (actual) {
      if (previo) {
        previo.siguiente = actual.siguiente;
      }
      return true; // Nodo eliminado
    }
  
    return false; // No se encontró el nodo
  }


  obtenerTodos(): T[] {
    const elementos: T[] = [];
    let actual = this.cabeza;
    while (actual) {
      elementos.push(actual.valor);
      actual = actual.siguiente;
    }
    return elementos;
  }
}


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  mostrarMenu: boolean = false;
  constructor(private router: Router) {}

  listaPlatillos = new ListaEnlazada<Platillo>();
  nuevoPlatillo: Platillo = {
    nombre: '',
    descripcion: '',
    precio: 0,
    categoria: '',
    imagen: '',
    estado: true,
  };

  ngOnInit(): void {
    // Cargar los platillos desde localStorage si existen
    const platillosGuardados = localStorage.getItem('platillos');
    if (platillosGuardados) {
      const platillosArray: Platillo[] = JSON.parse(platillosGuardados);
      platillosArray.forEach((platillo) => this.listaPlatillos.agregar(platillo));
    }
  }

  agregarPlatillo(): void {
    this.listaPlatillos.agregar({ ...this.nuevoPlatillo });
    this.actualizarLocalStorage();
    this.nuevoPlatillo = {
      nombre: '',
      descripcion: '',
      precio: 0,
      categoria: '',
      imagen: '',
      estado: true,
    };
    alert('Platillo agregado correctamente.');
  }

  eliminarPlatillo(indice: number): void {
    if (this.listaPlatillos.eliminar(indice)) {
      this.actualizarLocalStorage();
      alert('Platillo eliminado correctamente.');
    } else {
      alert('No se pudo eliminar el platillo.');
    }
  }

  obtenerPlatillos(): Platillo[] {
    return this.listaPlatillos.obtenerTodos();
  }
  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }

  irAPerfil() {
    this.router.navigate(['/trabajador']);
  }

  irAListaPedidos() {
    this.router.navigate(['/listadoPedidos']);
  }



  private actualizarLocalStorage(): void {
    const platillos = this.listaPlatillos.obtenerTodos();
    localStorage.setItem('platillos', JSON.stringify(platillos));
  }
}

interface Platillo {
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
  estado: boolean; // Disponible o no disponible
}
