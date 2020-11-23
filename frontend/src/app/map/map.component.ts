import { Component, OnInit } from '@angular/core';
import { latLng, MapOptions, tileLayer } from 'leaflet';
import { UbicacionService } from '../service/ubicacion.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  mapOptions: MapOptions;
  lat: number;
  lng: number;

  constructor(private Ubicacion: UbicacionService) {}

  ngOnInit(): void {
    this.traerUbicacion();
  }

  private initializeMapOptions() {
    console.log('esto es lo que llega en el mapa ' + this.lat + ' ' + this.lng);
    this.mapOptions = {
      center: latLng(this.lat, this.lng),
      zoom: 12,
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: 'Map data © OpenStreetMap contributors',
        }),
      ],
    };
    
  }

  traerUbicacion() {
    this.Ubicacion.obtenerUbicacion()
      .then((pos) => {
        this.lat = pos.lat;
        this.lng = pos.lng;
        console.log(this.lat, this.lng);
        this.initializeMapOptions();
      })
      .catch((err) => alert('por favor habilitar obtener ubicacion'));
  }

  // se comenta para probar por medio de un service
  /*  traerUbicacion() {
    navigator.geolocation.getCurrentPosition((position: Position) => {
      if (position) {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log(this.lat,this.lng);
      }
    });
  } */
}
