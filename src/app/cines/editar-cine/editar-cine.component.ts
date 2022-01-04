import { Component, OnInit } from '@angular/core';
import { cineCreacionDto, cineDto } from '../cine';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  constructor() { }
  modelo:cineDto = {nombre:'Cine de mierda', latitud: 6.300568552844825, longitud: -75.57734370231628};

  ngOnInit(): void {
  }

  
  guardarCambios(cine:cineCreacionDto){
    console.log(cine);
  }


}
