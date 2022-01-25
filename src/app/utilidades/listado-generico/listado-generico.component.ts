import { Component, Input, OnInit } from '@angular/core';
import { PeliculaDto } from 'src/app/peliculas/Pelicula';

@Component({
  selector: 'app-listado-generico',
  templateUrl: './listado-generico.component.html',
  styleUrls: ['./listado-generico.component.css']
})
export class ListadoGenericoComponent implements OnInit {

  @Input()
  listado;

  constructor() { }

  ngOnInit(): void {
  }

}
