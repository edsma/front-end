import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { actorDto } from '../Actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-indice-actores',
  templateUrl: './indice-actores.component.html',
  styleUrls: ['./indice-actores.component.css']
})
export class IndiceActoresComponent implements OnInit {

  constructor(private actoresService: ActoresService) { }

  actores: actorDto[];
  columnasMostrar = ['id','nombre','acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadElementosMostrar = 10;
  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual,this.cantidadElementosMostrar)    
  }

  cargarRegistros(pagina:number, cantidadElementosMostrar){
    this.actoresService.ObtenerTodos(pagina,cantidadElementosMostrar)
    .subscribe((respuesta: HttpResponse<actorDto[]>) => {
      this.actores = respuesta.body;
      this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros");
    }, error=> console.error(error));
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
