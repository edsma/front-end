import { Component, OnInit } from '@angular/core';
import { PeliculaCreacionDto } from '../Pelicula';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css']
})
export class CrearPeliculaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  guardarCambios(pelicula: PeliculaCreacionDto){
    console.log(pelicula);
  }
}
