import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegistroComponent } from './views/registro/registro.component';
import { PedidosComponent } from './views/order/pedidos.component';
import { TrabajadorComponent } from './views/trabajador/trabajador.component';
import { Routes } from '@angular/router';
import { HistorialPedidosComponent } from './views/history/historial-pedidos.component';
import { MenuComponent } from './views/menu/menu.component';
import { PerfilComponent } from './views/trabajador/perfil/perfil.component';
import { UserComponent } from './views/user/user.component';
import { EditarUserComponent } from './views/user/editar-user/editar-user.component';
import { ListaPedidosComponent } from './views/list/listado-pedidos.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'trabajador', component: TrabajadorComponent },
  { path: 'listadoPedidos', component: ListaPedidosComponent},
  { path: 'historialPedidos', component: HistorialPedidosComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'user', component: UserComponent},
  { path: "editar-perfil", component: PerfilComponent},
  { path: "editar-user", component: EditarUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}