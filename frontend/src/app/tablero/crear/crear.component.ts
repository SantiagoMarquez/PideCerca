import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {TableroService} from '../../service/tablero.service'

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  photoSelected: string | ArrayBuffer;
  file: File;

  constructor(private tablero: TableroService, private router: Router) { }

  ngOnInit() {
  }
 
  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  uploadPhoto(nombre: HTMLInputElement, precio: HTMLTextAreaElement) {
    this.tablero
      .crearActividadImg(nombre.value, precio.value, this.file)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/listarActividad'])
        },
        err => console.log(err)
      );
    return false;
  }

}