import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ListarComponent } from '../tablero/listar/listar.component';

@Injectable({
  providedIn: 'root'
})
export class TableroService {

  // api que nos permite crear y listar actividades
  private listaUrl='http://localhost:3000/api/tablero/lista';
  private crearUrl= 'http://localhost:3000/api/tablero';
  private imgUrl= 'http://localhost:3000/api/tablero/cargarArchivo';

  constructor(private http: HttpClient) { }

  
  // crear metodo subir imagen
  crearActividadImg(nombre: string, precio: string, photo: File) {
    const fd = new FormData();
    fd.append('nombre', nombre);
    fd.append('precio', precio);
    fd.append('sticker', photo);
    return this.http.post(this.imgUrl, fd);
  }

  listarActividad(){
    return this.http.get<any>(this.listaUrl);
  }
  
  

}
