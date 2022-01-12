import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { parsearErroresApi } from 'src/app/utilidades/utilidades';
import { primeraLetraMayuscula } from 'src/app/utilidades/Validadores/PrimeraLetraMayuscula';
import { generoCreacionDto } from '../Genero/Genero';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.css']
})
export class CrearGeneroComponent  {
  errores: string[] = [];
  constructor(private router: Router, private generosServices: GenerosService) { }

  guardarCambios(genero: generoCreacionDto)
  {
    this.generosServices.crear(genero).subscribe(()=> {
      this.router.navigate(['/generos']);
    }, (error) => this.errores = parsearErroresApi(error)
    );
  }


}
