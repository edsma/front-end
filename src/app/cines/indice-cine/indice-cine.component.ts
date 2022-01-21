import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { cineDto } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-indice-cine',
  templateUrl: './indice-cine.component.html',
  styleUrls: ['./indice-cine.component.css']
})
export class IndiceCineComponent implements OnInit {

  constructor(private actoresService: CinesService) { }

  cines: cineDto[];
  columnasMostrar = ['id','nombre','acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadElementosMostrar = 10;
  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual,this.cantidadElementosMostrar)    
  }

  cargarRegistros(pagina:number, cantidadElementosMostrar){
    this.actoresService.ObtenerTodos(pagina,cantidadElementosMostrar)
    .subscribe((respuesta: HttpResponse<cineDto[]>) => {
      this.cines = respuesta.body;
      this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros");
    }, errors=> console.error(errors));
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadElementosMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual,this.cantidadElementosMostrar);
  }

  borrar(id:number){
    this.actoresService.borrar(id)
    .subscribe(() => {
      this.cargarRegistros(this.paginaActual,this.cantidadElementosMostrar);
    }, error => console.error(error));
  }

}
