import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Pedido, PedidosService } from '../../service/pedidos.service';
import { auditTime } from 'rxjs';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-historial-pedidos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './historial-pedidos.component.html',
  styleUrl: './historial-pedidos.component.css'
})
export class HistorialPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
pedidosUsuario: any;

  constructor(
    private pedidosService: PedidosService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const usuarioActual = this.authService.obtenerUsuarioActual();
    if (usuarioActual) {
      this.pedidos = this.pedidosService.obtenerPedidosPorUsuario(usuarioActual.username);
    } else {
      alert('No se encontró un usuario autenticado.');
    }
  }
}
