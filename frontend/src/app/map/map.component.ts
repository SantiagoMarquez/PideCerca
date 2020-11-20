import { Component, OnInit } from '@angular/core';
import { latLng, MapOptions, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  mapOptions: MapOptions;
  lat: number;
  lng: number;

  constructor() {}



  ngOnInit(): void {
    this.traerUbicacion();
    this.initializeMapOptions();
  }

  traerUbicacion() {
    navigator.geolocation.getCurrentPosition((position: Position) => {
      if (position) {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log(this.lat,this.lng);
      }
    });
  }

  private initializeMapOptions() {
    this.mapOptions = {
      center: latLng(4.6269002,-74.1498029 ),
      zoom: 12,
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: 'Map data © OpenStreetMap contributors',
        }),
      ],
    };
  }
}
