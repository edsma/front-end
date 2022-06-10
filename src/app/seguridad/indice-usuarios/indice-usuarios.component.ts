import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { usuarioDto } from '../Seguridad';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-indice-usuarios',
  templateUrl: './indice-usuarios.component.html',
  styleUrls: ['./indice-usuarios.component.css']
})
export class IndiceUsuariosComponent implements OnInit {
  generos: usuarioDto[];
  columnasMostrar = ['id','nombre','acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadElementosMostrar = 10;
  usuarios: usuarioDto[];
  constructor(private seguridadService: SeguridadService) { }
  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual,this.cantidadElementosMostrar);
  }

  cargarRegistros(pagina:number, cantidadElementosMostrar){
    this.seguridadService.obtenerUsuarios(pagina,cantidadElementosMostrar)
    .subscribe((respuesta: HttpResponse<usuarioDto[]>) => {
      this.generos = respuesta.body;
      this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros");
    }, error=> console.error(error));
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadElementosMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual,this.cantidadElementosMostrar);
  }

  hacerAdmin(usuarioId: string ){
    this.seguridadService.hacerAdmin(usuarioId)
    .subscribe(()=> Swal.fire('Exitoso','La operación se ha realizado', 'success'));
  }

  removerAdmin(usuarioId: string ){
    this.seguridadService.removerAdmin(usuarioId)
    .subscribe(()=> Swal.fire('Exitoso','La operación se ha realizado', 'success'));
  }
}
