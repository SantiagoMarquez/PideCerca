import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { TableroService } from '../../service/tablero.service'


@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  id : string;
  lista=[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private tablero: TableroService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.tablero.listaActividad(this.id)
        .subscribe(
          res => {
            this.lista = res;
          },
          err => console.log(err)
        )
    });
  }

  deletePhoto(id: string) {
    this.tablero.eliminarActividad(id)
      .subscribe(res => {
        console.log(res)
        this.router.navigate(['/listarActividad']);
      })
  }

  updatePhoto(nombre: HTMLInputElement, precio: HTMLInputElement): boolean {
    this.tablero.editarActividad(this.id, nombre.value, precio.value)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/listarActividad']);
      });
    return false;
  }

}