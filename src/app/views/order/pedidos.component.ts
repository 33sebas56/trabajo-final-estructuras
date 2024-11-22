import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PedidosService } from '../../service/pedidos.service';

class NodoDoble<T> {
  valor: T;
  siguiente: NodoDoble<T> | null = null;
  anterior: NodoDoble<T> | null = null;

  constructor(valor: T) {
    this.valor = valor;
  }
}

class ListaDobleEnlazada<T> {
  private cabeza: NodoDoble<T> | null = null;
  private cola: NodoDoble<T> | null = null;

  agregar(valor: T): void {
    const nuevoNodo = new NodoDoble(valor);
    if (!this.cabeza) {
      this.cabeza = this.cola = nuevoNodo;
    } else {
      this.cola!.siguiente = nuevoNodo;
      nuevoNodo.anterior = this.cola;
      this.cola = nuevoNodo;
    }
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
  selector: 'app-pedidos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
})
export class PedidosComponent implements OnInit {
  mostrarMenu: boolean = false;
  listaPlatillos = new ListaDobleEnlazada<Platillo>();
  platillosFiltrados: PlatilloConCantidad[] = [];
  carrito: { platillo: PlatilloConCantidad; cantidad: number }[] = [];

  categorias: string[] = ['Todas', 'comida rapida', 'postre', 'pasta', 'plato fuerte', 'bebidas'];
  categoriaSeleccionada: string = 'Todas';

  constructor(private router: Router, private pedidosService: PedidosService) {}

  ngOnInit(): void {
    const platillosGuardados = localStorage.getItem('platillos');
    if (platillosGuardados) {
      const platillosArray: Platillo[] = JSON.parse(platillosGuardados);
      platillosArray.forEach((platillo) => this.listaPlatillos.agregar(platillo));
    }
    this.filtrarPorCategoria();
  }

  filtrarPorCategoria(): void {
    const todosLosPlatillos = this.listaPlatillos.obtenerTodos();
    if (this.categoriaSeleccionada === 'Todas') {
      this.platillosFiltrados = todosLosPlatillos.map((platillo) => ({
        ...platillo,
        cantidad: 1, 
      }));
    } else {
      this.platillosFiltrados = todosLosPlatillos
        .filter((platillo) => platillo.categoria === this.categoriaSeleccionada)
        .map((platillo) => ({
          ...platillo,
          cantidad: 1,
        }));
    }
  }

  agregarAlCarrito(platillo: PlatilloConCantidad): void {
    const existeEnCarrito = this.carrito.find((item) => item.platillo.nombre === platillo.nombre);
    if (existeEnCarrito) {
      existeEnCarrito.cantidad += platillo.cantidad;
    } else {
      this.carrito.push({ platillo, cantidad: platillo.cantidad });
    }
    alert(`Se ha añadido ${platillo.cantidad}x ${platillo.nombre} al carrito.`);
  }

  eliminarDelCarrito(indice: number): void {
    this.carrito.splice(indice, 1);
  }

  registrarPedidos(): void {
    this.carrito.forEach((item) => {
      this.pedidosService.agregarPedido(
        item.platillo.nombre,
        item.platillo.descripcion,
        item.platillo.precio
      );
    });
    alert('¡Pedido realizado con éxito!');
    this.carrito = [];
  }

  toggleMenu(): void {
    this.mostrarMenu = !this.mostrarMenu;
  }

  irAPerfil(): void {
    this.router.navigate(['/user']);
  }

  irAHistorialPedidos(): void {
    this.router.navigate(['/historialPedidos']);
  }
}

interface Platillo {
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
  estado: boolean;
}

interface PlatilloConCantidad extends Platillo {
  cantidad: number;
}