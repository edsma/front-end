import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiciosDto } from './turnos/Turnos';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  constructor(private http: HttpClient) { }
  private apiUrl = environment.apiUrl + 'Turnos';

  crear(servicio: ServiciosDto): Observable<ServiciosDto> {
    debugger;
    const prueba = this.http.post<ServiciosDto>(this.apiUrl, servicio);
    return prueba;
  }

}
