import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parsearErroresApi } from 'src/app/utilidades/utilidades';
import { generoCreacionDto, generoDto } from '../Genero/Genero';
import { GenerosService } from '../generos.service';
@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css']
})
export class EditarGeneroComponent implements OnInit {
  errores: string[] = [];
  constructor(private router: Router, 
    private generoService: GenerosService,
    private activatedRoute: ActivatedRoute) { }
    modelo: generoDto;


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=> {
      this.generoService.ObtenerPorId(params.id)
      .subscribe(genero => {
        this.modelo = genero;
        console.log(genero);
      }, () => this.router.navigate(['/generos']));
    })
  }



  guardarCambios(genero: generoCreacionDto)
  {
    this.generoService.editar(this.modelo.id,genero).subscribe(() => {
      this.router.navigate(['/cines'])
    },(error) => this.errores = parsearErroresApi(error) );
    console.log(genero);
  }


}
