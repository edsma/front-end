import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModelo';
import { PeliculaCreacionDto, PeliculaDto } from '../Pelicula';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css']
})
export class FormularioPeliculaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  form: FormGroup;

  @Output()
  OnSubmit: EventEmitter<PeliculaCreacionDto> = new EventEmitter<PeliculaCreacionDto>();
  
  @Input()
  modelo: PeliculaDto;

  generosNoSeleccionados: MultipleSelectorModel[] = [
    {llave:1, valor:'Drama'},
    {llave:2, valor:'Acción'},
    {llave:3, valor:'Comedia'} 
  ];

  cinesNoSeleccionados: MultipleSelectorModel[] = [
    {llave:1, valor:'Medellín'},
    {llave:2, valor:'Bello'},
    {llave:3, valor:'Sabaneta'} 
  ];

  cinesSeleccionados: MultipleSelectorModel[] = [];

  generosSeleccionados: MultipleSelectorModel[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo:['', {
        validators: [Validators.required]
      }],
      resumen: '',
      enCines: false,
      trailer: '',
      fechaLanzamiento: '',
      poster:'',
      generosId: '',
      cinesId: ''
    });

    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  guardarCambios(){
      const generosIds = this.generosSeleccionados.map(valores => valores.llave);
      this.form.get('generosId').setValue(generosIds);
      const cinesIds = this.cinesSeleccionados.map(valores => valores.llave);
      this.form.get('cinesId').setValue(cinesIds);
      this.OnSubmit.emit(this.form.value);
  }

  archivoSeleccionado(archivo:File){
    this.form.get('poster').setValue(archivo);
  }
}
