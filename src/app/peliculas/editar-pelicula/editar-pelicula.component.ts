import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { actorPeliculaDto } from 'src/app/actores/Actor';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModelo';
import { PeliculaCreacionDto, PeliculaDto } from '../Pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {
  generosNoSeleccionados: MultipleSelectorModel[];
  generosSeleccionados: MultipleSelectorModel[];
  cinesNoSeleccionados: MultipleSelectorModel[];
  cinesSeleccionados: MultipleSelectorModel[];
  actoresSeleccionados: actorPeliculaDto[];
  constructor(private peliculaService: PeliculasService,
    private activatedRoute: ActivatedRoute) { }
  modelo: PeliculaDto;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.peliculaService.putGet(params.id)
      .subscribe(peliculaPutGet => {
        debugger;
        this.modelo = peliculaPutGet.pelicula;

        this.generosNoSeleccionados = peliculaPutGet.generosNoSeleccionados.map(genero => {
          return <MultipleSelectorModel>{llave:genero.id,valor:genero.nombre}
        });

        this.generosSeleccionados = peliculaPutGet.generosSeleccionados.map(genero => {
          return <MultipleSelectorModel>{llave:genero.id,valor:genero.nombre}
        });

        this.cinesSeleccionados = peliculaPutGet.cinesSeleccionados.map(cine => {
          return <MultipleSelectorModel>{llave:cine.id,valor:cine.nombre}
        });

        this.actoresSeleccionados = peliculaPutGet.actores;
       
        this.cinesNoSeleccionados = peliculaPutGet.cinesNoSeleccionados.map(cine => {
          return <MultipleSelectorModel>{llave:cine.id,valor:cine.nombre}
        });
       
      });
    });
  }

  guardarCambios(pelicula: PeliculaCreacionDto){
    console.log(pelicula);
  }

}
