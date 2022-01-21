import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresApi } from 'src/app/utilidades/utilidades';
import { cineCreacionDto } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-crear-cine',
  templateUrl: './crear-cine.component.html',
  styleUrls: ['./crear-cine.component.css']
})
export class CrearCineComponent  {

  errores: string[] = [];
  constructor(private router: Router, private generosServices: CinesService) { }


  guardarCambios(cine: cineCreacionDto)
  {
    this.generosServices.crear(cine).subscribe(()=> {
      this.router.navigate(['/Cines']);
    }, (error) => this.errores = parsearErroresApi(error)
    );
  }

}
