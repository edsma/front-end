import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TurnosService } from '../turnos.service';
import { ServiciosDto } from './Turnos';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private turnosServices: TurnosService) { }
  
  registros: ServiciosDto;
  columnasMostrar = ['id','HoraInicio','HoraFin','Estado'];
  form: FormGroup;

  @Input()
  modelo: ServiciosDto;

  @Output()
  onSubmit: EventEmitter<ServiciosDto> = new EventEmitter<ServiciosDto>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      IdServicio: ['',{
        validators: [
          Validators.required,
        ]
      }],
      HoraInicio: ['',{
        validators: [
          Validators.required,
        ]
      }],
      HoraFin: ['',{
        validators: [
          Validators.required,
        ]
      }]      
    });

    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  guardarCambios()
  {
    this.turnosServices.crear(this.form.value).subscribe((res: ServiciosDto)=> {
      // this.router.navigate(['/Tipos']);
      this.registros = res;
      console.log(this.registros);
    }, (error) => console.log(error));
    
  }


}
