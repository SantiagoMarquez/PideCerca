import { Component, OnInit } from '@angular/core';
import { AuthService} from '../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  usuario : any =[];
  
  ngOnInit(): void {
    this.auth.obtenerDatosPerfil().subscribe(
      (res) =>{
        this.usuario = res
        console.log(this.usuario);
      },
      (err) =>{
        console.log(err);
      }
    )
  }

}
