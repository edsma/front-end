import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreacionDto, actorDto } from '../Actor';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.css']
})
export class FormularioActoresComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }

  form:FormGroup;
  
  @Output()
  submit: EventEmitter<actorCreacionDto> = new EventEmitter<actorCreacionDto>();
  
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
    this.form.get('foto').setValue(file);
  }

  onSubmit(){
    this.submit.emit(this.form.value)
  }

}
