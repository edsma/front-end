import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { primeraLetraMayuscula } from 'src/app/utilidades/Validadores/PrimeraLetraMayuscula';
import { generoCreacionDto } from '../Genero/Genero';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.css']
})
export class CrearGeneroComponent  {

  constructor(private router: Router) { }

  guardarCambios(genero: generoCreacionDto)
  {
    console.log(genero);

  }


}
