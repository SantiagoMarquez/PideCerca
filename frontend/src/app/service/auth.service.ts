import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registroUrl = 'http://localhost:3000/api/usuario/';
  private loginUrl = 'http://localhost:3000/api/auth/';
  private datosPerfilUrl = 'http://localhost:3000/api/usuario/perfil';
  private editarPerfilUrl = 'http://localhost:3000/api/usuario/editar';
  private imgUrl = 'http://localhost:3000/api/usuario/cargar'
  constructor( private http: HttpClient, private router: Router ) {}
    
    obtenerDatosPerfil() {
    return this.http.get<any>(this.datosPerfilUrl)
  }

  registroUsuario(usuario){
    return this.http.post<any>(this.registroUrl, usuario);
  }

  editarUsuario(usuario){
    return this.http.put<any>(this.editarPerfilUrl, usuario);
  }
   
  editarUsuarioImg(usuario){
    return this.http.put<any>(this.imgUrl, usuario);
  }

  loginUsuario(usuario){
    return this.http.post<any>(this.loginUrl, usuario);
  }
  
   loginOn(){
     return !!localStorage.getItem('token');
   }
   
   obtenerToken(){
     return localStorage.getItem('token');
   }

   cerrarSesion(){
     localStorage.removeItem('token');
     this.router.navigate(['/login']);
   }
}
