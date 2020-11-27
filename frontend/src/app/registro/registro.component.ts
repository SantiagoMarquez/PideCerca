import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  alerta:String='';

  constructor(private auth: AuthService, private router: Router) { }

  registrarUsuario ={
    nombre: '',
    cedula: '',
    edad: '',
    telefono: '',
    direccion: '',
    correo: '',
    password: '',
  }


  ngOnInit(): void {
  }

  registrar(){
    this.auth.registroUsuario(this.registrarUsuario).subscribe(
      (res) => {
        console.log(res);
        Swal.fire({
          title: 'Exito!',
          text: 'Registro exitoso',
          icon: 'success',
          timer:3000,
          confirmButtonText: 'Continuar'
        })
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log(err)
        Swal.fire({
          title: 'Error!',
          icon: 'error',
          timer: 3000,
          confirmButtonText: 'Continuar'
        })
      }
    )
  }
}

