import { Component, Input, OnInit } from '@angular/core';
import { PeliculaDto } from '../Pelicula';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css']
})
export class ListadoPeliculasComponent implements OnInit {

  constructor() { }
  @Input()
  peliculas: PeliculaDto[];
  ngOnInit(): void {
  }

  remover(IndicePelciula: number): void{
    this.peliculas.splice(IndicePelciula,1);
  }

}
