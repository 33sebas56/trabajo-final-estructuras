import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private pedidosKey = 'pedidos'; // Clave para almacenar pedidos en localStorage
  private platillos: Platillo[] = []; // Lista de platillos del menú

  // Cargar platillos al menú desde el componente MenuComponent
  cargarPlatillos(platillos: Platillo[]): void {
    this.platillos = platillos;
  }

  // Obtener los platillos filtrados por categoría
  filtrarPorCategoria(categoria: string): Platillo[] {
    if (categoria === 'Todas') return this.platillos;
    return this.platillos.filter((platillo) => platillo.categoria === categoria);
  }

  // Agregar pedido al historial (con usuario asociado)
  agregarPedido(
    nombre: string,
    descripcion: string,
    precio: number,
    usuarioId?: string
  ): void {
    const nuevoPedido: any = {
      nombre,
      descripcion,
      precio,
      usuarioId,
      estado: 'En espera', // Estado inicial para todos los pedidos
    };
  
    const pedidosGuardados = localStorage.getItem(this.pedidosKey);
    const pedidos = pedidosGuardados ? JSON.parse(pedidosGuardados) : [];
    pedidos.push(nuevoPedido);
    localStorage.setItem(this.pedidosKey, JSON.stringify(pedidos));
  }

  // Obtener todos los pedidos guardados en localStorage
  obtenerTodosLosPedidos(): { 
    nombre: string; 
    descripcion: string; 
    precio: number; 
    usuarioId?: string; 
    estado?: string; 
  }[] {
    const pedidosGuardados = localStorage.getItem('pedidos'); // Clave del localStorage
    if (!pedidosGuardados) return []; // Si no hay pedidos, devolvemos un array vacío
  
    const pedidos = JSON.parse(pedidosGuardados);
  
    // Validamos los campos para cada pedido
    return pedidos.map((pedido: any) => ({
      nombre: pedido.nombre || 'Sin nombre',
      descripcion: pedido.descripcion || 'Sin descripción',
      precio: pedido.precio || 0,
      usuarioId: pedido.usuarioId || 'Sin usuario',
      estado: pedido.estado || 'En espera', // Agregamos un estado por defecto
    }));
  }

  // Obtener pedidos filtrados por usuario
  obtenerPedidosPorUsuario(usuarioId: string): Pedido[] {
    const pedidos = this.obtenerTodosLosPedidos();
    return pedidos
      .filter((pedido) => pedido.usuarioId === usuarioId)
      .map((pedido) => ({
        nombre: pedido.nombre || 'Sin nombre',       // Aseguramos que tenga nombre
        descripcion: pedido.descripcion || 'Sin descripción', // Aseguramos descripción
        precio: pedido.precio || 0,                // Aseguramos que tenga precio
        estado: pedido.estado || 'En espera',      // Estado actual
        numeroFactura: 0,                          // Valor por defecto
        productos: [],                             // Lista vacía por defecto
        total: pedido.precio || 0,                 // Usamos precio como total inicial
        fecha: new Date(),                         // Fecha actual
        usuarioId: pedido.usuarioId,               // Usuario relacionado
      }));
  }

  // Limpia los pedidos (para pruebas o reinicios)
  limpiarPedidos(): void {
    localStorage.removeItem(this.pedidosKey);
  }
}

// Interfaces
export interface Platillo {
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
  estado: boolean;
}

export interface Pedido {
  nombre: string;
  descripcion: string;
  precio: number;
  usuarioId?: string;
  estado: string;
}