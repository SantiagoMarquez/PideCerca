import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TiendaService } from '../../service/tienda.service';
@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css'],
})
export class TiendasComponent implements OnInit {
  constructor(private tiendaService: TiendaService, private router: Router) {}
  lista = [];
  ngOnInit(): void {
    this.tiendaService.listaTiendas().subscribe(
      (res) => {
        this.lista = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
