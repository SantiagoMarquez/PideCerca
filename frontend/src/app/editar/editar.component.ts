import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  editarUsuario ={
    nombre: '',
    cedula: '',
    edad: '',
    telefono: '',
    direccion: '',
    password: '',
    foto: '',
  }

  elegirImg: File = null;

  subirArchivo(event){
    this.elegirImg = <File>event.target.files[0];
  }

  crearImg(event){
    const myFile= new FormData();
    myFile.append('nombre', this.editarUsuario.nombre);
    myFile.append('cedula', this.editarUsuario.cedula);
    myFile.append('edad', this.editarUsuario.edad);
    myFile.append('telefono', this.editarUsuario.telefono);
    myFile.append('direccion', this.editarUsuario.direccion);
    myFile.append('password', this.editarUsuario.password);
    myFile.append('foto', this.elegirImg, this.elegirImg.name);
    this.auth.editarUsuarioImg(myFile).subscribe(
      (res) =>{
        this.router.navigate(['/pagprincipal'])
      },
      (err) =>{
        console.log(err);
      }
    )
  }

  ngOnInit(): void {
  }

    editar(){
    this.auth.editarUsuario(this.editarUsuario).subscribe(
      (res) =>{
        console.log(res);
        this.router.navigate(['/pagprincipal']);
        // this.router.navigate(['/editar'])
      },
      (err) => console.log(err)
    )
  }
}
