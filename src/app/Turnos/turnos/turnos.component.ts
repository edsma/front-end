import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiciosMaestroDto } from '../ServiciosMaestro';
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
  servicios: ServiciosMaestroDto;
  columnasMostrar = ['id','HoraInicio','HoraFin','Estado','Acciones'];
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

    this.consultarServicios();
  }

  consultarServicios()
  {
    this.turnosServices.consultarServicios().subscribe((res: ServiciosMaestroDto)=> {
      this.servicios = res;
    }, (error) => console.log(error));
    
  }

  guardarCambios()
  {
    this.turnosServices.crear(this.form.value).subscribe((res: ServiciosDto)=> {
      this.registros = res;
    }, (error) => console.log(error));
    
  }


}
