import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { icon, latLng, LeafletMouseEvent, marker, Marker, tileLayer } from 'leaflet';
import { Coordenada, CoordenadaConMensaje } from './Coordenada';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  constructor() { }

  @Input()
  coordenadasIniciales: CoordenadaConMensaje [] = [];

  @Input()
  soloLectura: boolean = false;

  @Output()
  coordenadaSeleccionada: EventEmitter<Coordenada> = new EventEmitter<Coordenada>();

  ngOnInit(): void {
    this.capas = this.coordenadasIniciales.map((valor) => { 
      let marcador = marker([valor.latitud,valor.longitud]);
      if(valor.mensaje){
        marcador.bindPopup(valor.mensaje, {autoClose: false, autoPan: false});
      }
      return marcador;
    });
  }

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 14,
    center: latLng(6.300568552844825, -75.57734370231628)
  };

  capas: Marker<any>[] = [];

  manejarClick(event: LeafletMouseEvent){

    if(!this.soloLectura){
      const latitud = event.latlng.lat;
      const longitud = event.latlng.lng;
      this.capas = [];
      this.capas.push(marker([latitud,longitud],{icon:icon({
        iconSize:[25,41],
        iconAnchor: [13,41],
        iconUrl:'marker-icon.png',
        iconRetinaUrl:'marker-icon-2x.png',
        shadowUrl:'assets/marker-shadow.png'
      })}));
      this.coordenadaSeleccionada.emit({latitud: latitud, longitud: longitud});
    }
 
  }

}
