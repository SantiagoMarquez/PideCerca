import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  constructor(private http: HttpClient) {}

  private pedidoUrl = 'http://localhost:3000/api/pedido';
  private borrarPedidoUrl = 'http://localhost:3000/api/pedido/empty-cart';

  agregarAlPedido(payload) {
    return this.http.post<any>(this.pedidoUrl, payload);
  }
  getCartItems() {
    return this.http.get<any>(this.pedidoUrl);
  }
  incrementarCantidad(payload) {
    return this.http.post<any>(this.pedidoUrl, payload);
  }
  borarPedido() {
    return this.http.delete<any>(this.borrarPedidoUrl);
  }
}
