import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { actorCreacionDto, actorDto } from '../Actor';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css']
})
export class EditarActorComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }
  modelo: actorDto = {
    nombre: 'Ed',
    fechaNacimiento: new Date(),
    foto: 'https://pbs.twimg.com/media/FIDUSHeWUAUtXNU?format=jpg&name=medium'
  };
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params.id);
    })
  }

  GuardarCambios(actor: actorCreacionDto){
    console.log(actor);
  }

}
