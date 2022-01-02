import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { generoCreacionDto } from '../Genero/Genero';
@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css']
})
export class EditarGeneroComponent implements OnInit {
  constructor(private router: Router) { }
  modelo: generoCreacionDto = {Nombre: 'Drama'};
  ngOnInit(): void {

  }



  guardarCambios(genero: generoCreacionDto)
  {
    console.log(genero);

  }


}
