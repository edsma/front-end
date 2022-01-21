import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cineCreacionDto, cineDto } from './cine';

@Injectable({
  providedIn: 'root'
})
export class CinesService {

  constructor(private http: HttpClient) { }
  private apiUrl = environment.apiUrl + 'cines';

  public crear(cine: cineCreacionDto){
    return this.http.post(this.apiUrl, cine);
  }
    
  public ObtenerTodos(pagina:number,cantidadRegistrosMostrar:number): Observable<any>{
    let param = new HttpParams();
    param = param.append('pagina',pagina.toString());
    param = param.append('recordsPagina', cantidadRegistrosMostrar.toString());;
    return this.http.get<cineDto[]>(this.apiUrl, {observe: "response", params: param} );
  }

  public ObtenerPorId(id:number): Observable<cineDto>{
    return this.http.get<cineDto>(`${this.apiUrl}/${id}`);
  }

  public editar(id:number,cine: cineCreacionDto){
    return this.http.put(`${this.apiUrl}/${id}`,cine);
  }

  
  public borrar(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
