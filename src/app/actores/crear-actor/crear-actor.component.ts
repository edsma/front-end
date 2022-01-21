import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresApi } from 'src/app/utilidades/utilidades';
import { actorCreacionDto } from '../Actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrls: ['./crear-actor.component.css']
})
export class CrearActorComponent implements OnInit {

  constructor(private actorService: ActoresService, private router: Router) { }

  ngOnInit(): void {
  }
  errores = [];

  guardarCambios(actor: actorCreacionDto){
    this.actorService.crear(actor)
    .subscribe(() => {
      this.router.navigate(['/actores']);
    }, errores => this.errores = parsearErroresApi(errores))
  }

}
