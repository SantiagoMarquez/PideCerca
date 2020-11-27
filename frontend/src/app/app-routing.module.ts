import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearComponent } from './tablero/crear/crear.component';
import { ListarComponent } from './tablero/listar/listar.component';
import { ActualizarComponent } from './tablero/actualizar/actualizar.component';



const routes: Routes = [

  {
    path:'listarActividad',
    component:ListarComponent,
    
   },
   {
     path:'crearActividad',
     component:CrearComponent,
    

   },
   {
    path: 'listarActividad/:id',
    component: ActualizarComponent,
  },
   {
    //una ruta de navegación 'vacio ' lo primero que carga muestra el componente login
    path:'',
    redirectTo:'listarActividad',
    pathMatch:'full'
  },
   
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
