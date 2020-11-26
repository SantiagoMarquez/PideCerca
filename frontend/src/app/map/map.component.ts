import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { latLng, MapOptions, tileLayer, icon } from 'leaflet';
import * as Leaflet from 'leaflet';
import { UbicacionService } from '../service/ubicacion.service';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit {
  map: Leaflet.Map;
  tiendasList = [];
  public latitude;
  public longitude;
  public center;
  mapOptions: MapOptions;

  constructor(public ubicacionService: UbicacionService) {}

  ngOnInit(): void {
    this.traerUbicacion();
    this.map = new Leaflet.Map('map').setView([4.62585, -74.14713], 18);
    Leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data © OpenStreetMap contributors',
    }).addTo(this.map);

    fetch('../../assets/data/data.json')
      .then((res) => res.json())
      .then((data) => {
        this.tiendasList = data.tiendas;
        this.leafletMap();
      })
      .catch((err) => console.log(err));
  }

  ngAfterViewInit(): void {}

  traerUbicacion() {
    this.ubicacionService
      .obtenerUbicacion()
      .then((pos) => {
        this.latitude = pos.lat;
        this.longitude = pos.lng;

        console.log(this.latitude, this.longitude);
      })

      .catch((err) => {
        alert('algo salio mal para ver la ubicacion');
      });
  }

  leafletMap(): void {
    for (const tienda of this.tiendasList) {
      Leaflet.marker([tienda.latitud, tienda.longitud])
        .addTo(this.map)
        .setIcon(
          icon({
            iconSize: [45, 41],
            iconAnchor: [13, 41],
            iconUrl: '../../assets/images/gorra.svg',
          })
        )
        .bindPopup(tienda.nombre  +`` +
        `<div>Categoria: ${ tienda.categoria }</div>` +
        `<div>Descripcion: ${ tienda.descripcion}</div>`+
        `<a href="http://localhost:4200/pagprincipal">Ir a la tienda</a>` )
        .openPopup();
    }
  }

  ngOnDestroy(): void {
    this.map.remove();
  }
}

/* async function iniciarmapa() {
  try {
    const traercoord = this.MapComponent.traerUbicacion();
    console.log(traercoord);
  } catch (error) {
    console.log(error);
  }
}
iniciarmapa(); */
// se comenta para probar por medio de un service
/*  traerUbicacion() {
    navigator.geolocation.getCurrentPosition((position: Position) => {
      if (position) {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log(this.lat,this.lng);
      }
    });
  } 
  */

/*   traerUbicacion() {
    this.Ubicacion.obtenerUbicacion()
      .then((pos) => {
        this.lat = pos.lat;
        this.lng = pos.lng;
        console.log(this.lat, this.lng); 
        console.log(pos);
      })
      .then((pos)=>{
        this.initializeMapOptions();
        console.log("este es el segundo catch");
      })
      .catch((err) => alert('por favor habilitar obtener ubicacion'));
  }
 */

/* 
public initializeMapOptions() {
  console.log('esto es lo que llega en el mapa ' + this.latitude + ' ' + this.longitude);
  this.mapOptions = {
    center: latLng( 4.6178936,-74.1586548),
    zoom: 18,
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data © OpenStreetMap contributors',
      })
    ],
  };
} */
