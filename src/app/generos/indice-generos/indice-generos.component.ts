import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { generoDto } from '../Genero/Genero';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrls: ['./indice-generos.component.css']
})
export class IndiceGenerosComponent implements OnInit {

  constructor(private generosService: GenerosService) { }

  generos: generoDto[];
  columnasMostrar = ['id','nombre','acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadElementosMostrar = 10;
  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual,this.cantidadElementosMostrar)    
  }

  cargarRegistros(pagina:number, cantidadElementosMostrar){
    this.generosService.ObtenerPaginados(pagina,cantidadElementosMostrar)
    .subscribe((respuesta: HttpResponse<generoDto[]>) => {
      this.generos = respuesta.body;
      this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros");
    }, error=> console.error(error));
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadElementosMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual,this.cantidadElementosMostrar);
  }

  borrar(id:number){
    this.generosService.borrar(id)
    .subscribe(() => {
      this.cargarRegistros(this.paginaActual,this.cantidadElementosMostrar);
    }, error => console.error(error));
  }

}
