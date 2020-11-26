import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagprincipalComponent } from './pagprincipal/pagprincipal.component';
import { RegistroComponent } from './registro/registro.component';
import { TiendasComponent } from './tienda/tiendas/tiendas.component';



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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
