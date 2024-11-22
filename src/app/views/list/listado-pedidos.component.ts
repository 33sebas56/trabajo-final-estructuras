import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { PedidosService } from '../../service/pedidos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listado-pedidos',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.css'],
})
export class ListaPedidosComponent implements OnInit {
  mostrarMenu: boolean = false;
  pedidos: {
    nombre: string;
    descripcion: string;
    precio: number;
    usuarioId?: string;
    estado: string; // Nuevo campo para manejar el estado
  }[] = [];

  constructor(private pedidosService: PedidosService, private router: Router) {}

  ngOnInit(): void {
    // Cargar pedidos desde el servicio y asegurar el campo estado
    const pedidosGuardados = this.pedidosService.obtenerTodosLosPedidos();

    if (!pedidosGuardados || !Array.isArray(pedidosGuardados)) {
      this.pedidos = [];
      return;
    }

    this.pedidos = pedidosGuardados.map((pedido) => ({
      ...pedido,
      estado: pedido.estado || 'En espera',
    }));
  }

  // Métodos para cambiar el estado
  cambiarEstado(pedido: any, nuevoEstado: string): void {
    pedido.estado = nuevoEstado;
  }

  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }

  irAMenu() {
    this.router.navigate(['/menu']);
  }

  irAPerfil() {
    this.router.navigate(['/trabajador']);
  }
}