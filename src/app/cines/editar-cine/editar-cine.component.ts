import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parsearErroresApi } from 'src/app/utilidades/utilidades';
import { cineCreacionDto, cineDto } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  errores: string[] = [];
  constructor(private router: Router, 
    private cineService: CinesService,
    private activatedRoute: ActivatedRoute) { }
    modelo: cineDto;


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=> {
      this.cineService.ObtenerPorId(params.id)
      .subscribe(cine => {
        this.modelo = cine;
        console.log(cine);
      }, () => this.router.navigate(['/cines']));
    })
  }

  guardarCambios(cine: cineCreacionDto)
  {
    this.cineService.editar(this.modelo.id,cine).subscribe(() => {
      this.router.navigate(['/cines'])
    },(error) => this.errores = parsearErroresApi(error) );
    console.log(cine);
  }
}
