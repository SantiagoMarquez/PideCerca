import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { PedidoService } from '../../service/pedido.service';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
})
export class PedidosComponent implements OnInit {
  pedidos;
  detallePedidos;
  constructor(private pedidoService: PedidoService, private router: Router) {}
  obtenerPedidos(): void {
    this.pedidoService.getCartItems().subscribe(
      (res) => {
        this.pedidos = res;
        Object.entries(this.pedidos).forEach(
          ([key, value]) => console.log(key, value)
        );
        console.log('pedidos', this.pedidos);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  incrementarCantidad(id: any, cantidad: any): void {
    const payload = {
      productId: id,
      cantidad,
    };
    this.pedidoService.incrementarCantidad(payload).subscribe(
      (res) => {
        this.obtenerPedidos();
        Swal.fire({
          title: 'Producto agregado!',
          icon: 'success',
          timer: 2000,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  borrarPedido(): void {
    this.pedidoService.borarPedido().subscribe(
      (_res) => {
        this.obtenerPedidos();
        Swal.fire({
          title: 'Pedido borrado!',
          icon: 'success',
          timer: 2000,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ngOnInit(): void {
    this.obtenerPedidos();
  }
}
