import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute ) { }
  form: FormGroup;

  generos = [
    {id:1,Nombre: 'Drama'},
    {id:2,Nombre: 'Acción'},
    {id:3,Nombre: 'Comedia'}
  ];

  peliculas = [{
    titulo: 'Spider-man: No Way Home',
    enCines: false,
    proximosEstrenos: true,
    generos: [1,2],
    poster: 'https://images.thedirect.com/media/photos/FFsnSEsXoAY9nKC.jpg'
    },
    {
      titulo: 'Moana',
      enCines: true,
      proximosEstrenos: false,
      generos: [3],
      poster: 'https://m.media-amazon.com/images/I/61LvklojTFL._AC_.jpg'
    }

  ];

  peliculasOriginal = this.peliculas;
  formularioOriginal = {
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false
  }

  ngOnInit(): void {
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
      this.peliculas = this.peliculasOriginal;
      this.buscarPeliculas(valores);
      this.escribirParametrosBusquedaEnUrl();
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
    if(valores.titulo){
        this.peliculas = this.peliculas.filter(pelicula => pelicula.titulo.indexOf(valores.titulo) !== -1);
    }

    if(valores.generoId !== 0){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.generos.indexOf(valores.generoId) !== -1);
    }

    if(valores.proximosEstrenos){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.proximosEstrenos);
    }

    if(valores.enCines){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.enCines);
    }
  }

  limpiar(){
    this.form.patchValue(this.formularioOriginal);
  }

}
