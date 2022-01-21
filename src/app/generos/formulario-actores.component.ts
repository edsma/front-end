import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { actorCreacionDto, actorDto } from '../actores/Actor';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.css']
})
export class FormularioActoresComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  form:FormGroup;
  
  @Output()
  onSubmit: EventEmitter<actorCreacionDto> = new EventEmitter<actorCreacionDto>();
  
  imagenCambiada = false;

  @Input()
  modelo:actorDto;


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['',{
        validators: [Validators.required],

      }],
      fechaNacimiento : '',
      foto: ''
    });

    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  archivoSeleccionado(file){
    this.imagenCambiada = true;
    this.form.get('foto').setValue(file);
  }

  guardarCambios(){
    if(!this.imagenCambiada){
      this.form.patchValue({'foto': null});
    }

    this.onSubmit.emit(this.form.value);
  }

}
