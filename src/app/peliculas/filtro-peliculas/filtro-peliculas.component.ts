import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { generoDto } from 'src/app/generos/Genero/Genero';
import { GenerosService } from 'src/app/generos/generos.service';
import { PeliculaDto } from '../Pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private generosService: GenerosService,
    private peliculasService: PeliculasService ) { }
  form: FormGroup;

  generos: generoDto[] = [];

  peliculas:PeliculaDto[];
  paginaActual = 1;
  cantidadElementosMostrar = 10;
  cantidadElementos;   

  formularioOriginal = {
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false
  }

  ngOnInit(): void {
    this.generosService.ObtenerTodos()
    .subscribe(generos => {
      debugger;
      this.generos = generos;
      this.form = this.formBuilder.group({
        titulo: '',
        generoId: 0,
        proximosEstrenos: false,
        enCines: false
      });
      this.leerValoresUrl(); 
      this.buscarPeliculas(this.form.value);
  
      this.form.valueChanges
      .subscribe(valores => {
        this.buscarPeliculas(valores);
        this.escribirParametrosBusquedaEnUrl();
      });
    });
  }

  private leerValoresUrl(){
    this.activatedRoute.queryParams.subscribe((params)=> {
      var objeto: any = {};
      if(params.titulo){
        objeto.titulo = params.titulo;
      }

      if(params.generoId){
        objeto.generoId = Number(params.generoId);
      }

      if(params.proximosEstrenos){
        objeto.proximosEstrenos = params.proximosEstrenos;
      }

      if(params.enCines){
        objeto.enCines = params.enCines;
      }
      this.form.patchValue(objeto);
    });
  }

  private escribirParametrosBusquedaEnUrl(){
    var queryString = [];
    var valoresFormulario = this.form.value;
    if(valoresFormulario.titulo){
      queryString.push(`titulo=${valoresFormulario.titulo}`);
    }

    if(valoresFormulario.generoId){
      queryString.push(`generoId=${valoresFormulario.generoId}`);
    }

    if(valoresFormulario.proximosEstrenos){
      queryString.push(`proximosEstrenos=${valoresFormulario.proximosEstrenos}`);
    }

    if(valoresFormulario.enCines){
      queryString.push(`enCines=${valoresFormulario.enCines}`);
    }

    this.location.replaceState('peliculas/buscar', queryString.join('&'));
  }

  buscarPeliculas(valores:any){
    debugger;
    valores.pagina = this.paginaActual;
    valores.recordsPorPagina = this.cantidadElementosMostrar;
    this.peliculasService.filtrar(valores)
    .subscribe(response => {
      this.peliculas = response.body;
      this.cantidadElementos = response.headers.get('cantidadTotalRegistros');
      this.escribirParametrosBusquedaEnUrl();

    });
  }

  limpiar(){
    this.form.patchValue(this.formularioOriginal);
  }

  paginatorUpdate(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadElementosMostrar = datos.pageSize;
    this.buscarPeliculas(this.form.value);
  }

}
