import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PedidoService } from '../../service/pedido.service';
import { ProductoService } from '../../service/producto.service';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  constructor( private pedidoService:PedidoService, private productoService:ProductoService, private router:Router) { }

  ngOnInit(): void {
  }

}
