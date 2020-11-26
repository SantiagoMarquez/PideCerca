import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TiendaService {
  constructor(private http: HttpClient) {}

  private listaUrl = 'http://localhost:3000/api/tienda/lista';

  listaTiendas() {
    return this.http.get<any>(this.listaUrl);
  }
}
