import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiciosDto } from './turnos/Turnos';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ServiciosMaestroDto } from './ServiciosMaestro';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  consultarServicios(): Observable<ServiciosMaestroDto>  {
    return this.http.get<ServiciosMaestroDto>(this.apiUrl);
  }
  constructor(private http: HttpClient) { }
  private apiUrl = environment.apiUrl + 'Turnos';

  crear(servicio: ServiciosDto): Observable<ServiciosDto> {
    
    const prueba = this.http.post<ServiciosDto>(this.apiUrl, servicio);
    return prueba;
  }

}
