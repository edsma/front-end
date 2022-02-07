import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PeliculaDto } from '../Pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css']
})
export class ListadoPeliculasComponent implements OnInit {

  constructor(private peliculaService: PeliculasService) { }
  @Input()
  peliculas: PeliculaDto[];
  
  @Output()
  borrado: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
  }

  borrar(peliculaId: number): void{
    this.peliculaService.borrar(peliculaId)
    .subscribe(() => this.borrado.emit());
  }

}
