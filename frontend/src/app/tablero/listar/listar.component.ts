import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { TableroService } from '../../service/tablero.service'


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

 
  lista = [];

  constructor(
    private tablero: TableroService,
    private router: Router 
  ) { }

  ngOnInit() {
    this.tablero.listarActividad()
      .subscribe(
        res => {
          this.lista = res;
        },
        err => console.log(err)
      )
  }

  selectedCard(id: string) {
    this.router.navigate(['/listarActividad', id]);
  }

}













