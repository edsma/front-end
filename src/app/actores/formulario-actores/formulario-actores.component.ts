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
  Onsubmit: EventEmitter<actorCreacionDto> = new EventEmitter<actorCreacionDto>();
  
  @Input()
  modelo:actorDto;

  @Input()
  errores: string[] = []

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['',{
        validators: [Validators.required],

      }],
      fechaNacimiento : '',
      foto: '',
      biografia: ''
    });

    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  archivoSeleccionado(file){
    this.form.get('foto').setValue(file);
  }

  cambioMarkDown(texto:string){
    this.form.get('biografia').setValue(texto);
  }

  onSubmit(){
    this.Onsubmit.emit(this.form.value)
  }

}
