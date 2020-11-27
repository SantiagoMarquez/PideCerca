import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PedidoService } from '../../service/pedido.service';
import { ProductoService } from '../../service/producto.service';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  constructor(
    private productoService: ProductoService,
    private pedidoService: PedidoService,
    private router: Router
  ) {}
  lista = [];
  obtenerProductos(): void {
    this.productoService.listaProductos().subscribe(
      (res) => {
        this.lista = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  agregarItemAPedido(id, cantidad): void {
    let payload = {
      productId: id,
      cantidad,
    };
    this.pedidoService.addItemToCart(payload).subscribe(
      (res) => {
        this.obtenerProductos();
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
  ngOnInit(): void {
    this.obtenerProductos();
  }
}
