import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModelo';
import { parsearErroresApi } from 'src/app/utilidades/utilidades';
import { PeliculaCreacionDto } from '../Pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css']
})
export class CrearPeliculaComponent implements OnInit {

  errores: string[] = [];
  constructor(private peliculaService: PeliculasService) { }
  generosNoSeleccionados: MultipleSelectorModel[];
  cinesNoSeleccionados: MultipleSelectorModel[];

  ngOnInit(): void {
    this.peliculaService.postGet()
    .subscribe(resultado => {
      this.generosNoSeleccionados = resultado.generos.map(genero => {
        return <MultipleSelectorModel>{llave:genero.id,valor:genero.nombre}
      });
     
      this.cinesNoSeleccionados = resultado.cines.map(cine => {
        return <MultipleSelectorModel>{llave:cine.id,valor:cine.nombre}
      });

    }, error => console.log(error));
  }

  guardarCambios(pelicula: PeliculaCreacionDto){
    this.peliculaService.crear(pelicula)
    .subscribe(() => console.log('exitoso'),
    error => this.errores = parsearErroresApi(error));
  }
}
