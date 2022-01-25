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
    this.peliculasService.obtenerLandingPage().subscribe(landingPage => {
      this.peliculasEnCine = landingPage.enCines;
      this.peliculasProximosEstrenos = landingPage.proximosEstrenos;

    });
    
  }

  manejarRated(voto:number): void{
    alert(voto);
  }
}
