import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductoService } from '../../service/producto.service';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  constructor(
    private ProductoService: ProductoService,
    private router: Router
  ) {}
  lista = [];
  ngOnInit(): void {
    this.ProductoService.listaProductos().subscribe(
      (res) => {
        this.lista = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
