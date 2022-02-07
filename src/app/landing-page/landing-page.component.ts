import { Component, OnInit } from '@angular/core';
import { PeliculaDto } from '../peliculas/Pelicula';
import { PeliculasService } from '../peliculas/peliculas.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  peliculasEnCine: PeliculaDto[];
  peliculasProximosEstrenos: PeliculaDto[];
  constructor(private peliculasService: PeliculasService) { }

  ngOnInit(): void {
    this.cargarDatos();   
  }

  manejarRated(voto:number): void{
    alert(voto);
  }

  cargarDatos(){
    this.peliculasService.obtenerLandingPage().subscribe(landingPage => {
      this.peliculasEnCine = landingPage.enCines;
      this.peliculasProximosEstrenos = landingPage.proximosEstrenos;

    });
  }

  borrado(){
    this.cargarDatos();
  }
}
