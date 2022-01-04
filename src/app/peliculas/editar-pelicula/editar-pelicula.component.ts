import { Component, OnInit } from '@angular/core';
import { PeliculaCreacionDto, PeliculaDto } from '../Pelicula';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  constructor() { }
  modelo: PeliculaDto = {
    titulo: 'Spider-man: far from home',
    trailer: 'https://www.youtube.com/watch?v=JfVOs4VSpmA&ab_channel=SonyPicturesEntertainment',
    enCines: true,
    resumen: 'Spiderman',
    fechaLanzamiento: new Date(),
    poster: 'https://es.web.img3.acsta.net/pictures/19/06/04/09/41/5108791.jpg'
};

  ngOnInit(): void {
  }

  guardarCambios(pelicula: PeliculaCreacionDto){
    console.log(pelicula);
  }

}
