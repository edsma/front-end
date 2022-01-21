import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Coordenada } from 'src/app/utilidades/mapa/Coordenada';
import { cineCreacionDto } from '../cine';

@Component({
  selector: 'app-formulario-cine',
  templateUrl: './formulario-cine.component.html',
  styleUrls: ['./formulario-cine.component.css']
})
export class FormularioCineComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup;
  
  @Input()
  modelo: cineCreacionDto;

  @Input()
  errores: string[] = [];

  @Output()
  guardarCambios: EventEmitter<cineCreacionDto> = new EventEmitter<cineCreacionDto>();
  coordenadaInicial:Coordenada [] =[];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
       nombre: ['',
        {
          validators: [Validators.required],
        }
    ],
      latitud:['',
      {
        Validators: [Validators.required] 
      }        
    ],
      longitud:['',
      {
        Validators: [Validators.required] 
      }
    ]
    });

    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
      this.coordenadaInicial.push({latitud:this.modelo.latitud,longitud: this.modelo.longitud});
    }
  }

  coordenadaSeleccionada(coordenada: Coordenada){
    this.form.patchValue(coordenada);
  }

  onSubmit(){
    this.guardarCambios.emit(this.form.value);
  }

}
