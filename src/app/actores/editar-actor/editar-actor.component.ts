import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parsearErroresApi } from 'src/app/utilidades/utilidades';
import { actorCreacionDto, actorDto } from '../Actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css']
})
export class EditarActorComponent implements OnInit {
  errores: string[] = [];
  constructor(private router: Router, 
    private actorService: ActoresService,
    private activatedRoute: ActivatedRoute) { }
    modelo: actorDto;


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=> {
      this.actorService.ObtenerPorId(params.id)
      .subscribe(actor => {
        this.modelo = actor;
        console.log(actor);
      }, () => this.router.navigate(['/actores']));
    })
  }



  guardarCambios(actor: actorCreacionDto)
  {
    this.actorService.editar(this.modelo.id,actor).subscribe(() => {
      this.router.navigate(['/actores'])
    },(error) => this.errores = parsearErroresApi(error) );
    console.log(actor);
  }

}
