import { Component, OnInit } from '@angular/core';
import { actorCreacionDto } from '../Actor';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrls: ['./crear-actor.component.css']
})
export class CrearActorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  guardarCambios(actor: actorCreacionDto){
    console.log(actor);
  }

}
