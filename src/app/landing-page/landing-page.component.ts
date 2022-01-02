import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  peliculasEnCine;
  peliculasProximosEstrenos;
  constructor() { }

  ngOnInit(): void {
    this.peliculasEnCine = [{
      titulo: 'Spider-man - no way home',
      fechaLanzamiento: new Date(),
      precio: 1400.99,
      poster: 'https://images.thedirect.com/media/photos/FFsnSEsXoAY9nKC.jpg'
    },
    {
      titulo: 'Moana',
      fechaLanzamiento: new Date(),
      precio: 1400.99,
      poster: 'https://m.media-amazon.com/images/I/61LvklojTFL._AC_.jpg'
    }]

    this.peliculasProximosEstrenos = [{
      titulo: 'Avengers - EndGame',
      fechaLanzamiento: new Date(),
      precio: 1400.99
    },
    {
      titulo: 'Dr Strange in the multiverse of madness',
      fechaLanzamiento: new Date(),
      precio: 1400.99
    },
  ]
  }

  manejarRated(voto:number): void{
    alert(voto);
  }
}
