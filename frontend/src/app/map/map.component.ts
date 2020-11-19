import { Component, OnInit } from '@angular/core';
import{latLng,MapOptions,tileLayer} from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  
  mapOptions:MapOptions;

  constructor() { }

  ngOnInit(): void {
    this.initializeMapOptions();
  }

  private initializeMapOptions(){
    this.mapOptions={
      center:latLng(51.505,0),
      zoom:12,
      layers:[
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom:18,
            attribution:'Map data © OpenStreetMap contributors'
          })
      ],
    };
  }

}
