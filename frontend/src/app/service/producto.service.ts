import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(private http: HttpClient) {}

  private listaUrl = 'http://localhost:3000/api/producto/lista';

  listaProductos() {
    return this.http.get<any>(this.listaUrl);
  }
}
