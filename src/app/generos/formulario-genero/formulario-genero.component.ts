import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { primeraLetraMayuscula } from 'src/app/utilidades/Validadores/PrimeraLetraMayuscula';
import { generoCreacionDto } from '../Genero/Genero';

@Component({
  selector: 'app-formulario-genero',
  templateUrl: './formulario-genero.component.html',
  styleUrls: ['./formulario-genero.component.css']
})
export class FormularioGeneroComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder) { }
  form: FormGroup;
  @Input()
  modelo: generoCreacionDto;

  @Input()
  errores: string[] = [];

  @Output()
  onSubmit: EventEmitter<generoCreacionDto> = new EventEmitter<generoCreacionDto>();
    ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['',{
        validators: [
          Validators.required,
          Validators.minLength(3),
          primeraLetraMayuscula()
        ]
      }]
    });

    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  guardarCambios(){
    this.onSubmit.emit(this.form.value);
  }

  obtenerErrorCampoNombre(){
    var campo = this.form.get('Nombre');

    if(campo.hasError('required')){
      return 'El campo nombre es requerido';
    }

    if(campo.hasError('primeraLetraMayuscula')){
      return campo.getError('primeraLetraMayuscula').mensaje;
    }

    if(!campo.hasError('minLength')){
      return 'La logintud minima es de 3 caracteres';
    }
    return '';
  }

}
