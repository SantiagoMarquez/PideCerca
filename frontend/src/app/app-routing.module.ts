import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagprincipalComponent } from './pagprincipal/pagprincipal.component';
import { RegistroComponent } from './registro/registro.component';
import { TiendasComponent } from './tienda/tiendas/tiendas.component';
import { ProductosComponent } from './producto/productos/productos.component';
import { MapComponent } from './map/map.component';

import { ContactanosComponent } from './contactanos/contactanos.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthGuard } from './guard/auth.guard';
import { EditarComponent } from './editar/editar.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'pagprincipal',
    component: PagprincipalComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registro',
    component: RegistroComponent,
  },
  {
    path: 'tiendas',
    component: TiendasComponent,
  },
  {
    path: 'contactanos',
    component: ContactanosComponent,
  },
  {
    path: 'aboutUs',
    component: AboutUsComponent,
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editar',
    component: EditarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mapa',
    component: MapComponent,
  },
  {
    path: 'producto',
    component: ProductosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
