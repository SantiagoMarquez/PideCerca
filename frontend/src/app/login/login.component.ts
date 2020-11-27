import { Component, OnInit } from '@angular/core';
import { AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }
  loguear={
    correo: '',
    password: '',
  };

  ngOnInit(): void {
  }

  login(){
    this.auth.loginUsuario(this.loguear).subscribe(
      (res) => {
        console.log(res);
        Swal.fire({
          title: 'Bienvenido!',
          icon: 'success',
          timer: 3000 ,
          confirmButtonText: 'Continuar'
        })
        localStorage.setItem('token', res.jwtToken)
        this.router.navigate(['/pagprincipal']);
      },
      (err) =>{ 
        console.log(err)
        Swal.fire({
          title: 'Error!',
          text: 'Correo o contrasena erroneos',
          icon: 'error',
          timer: 3000 ,
          confirmButtonText: 'Continuar'
        })
        }
    );
  }
}