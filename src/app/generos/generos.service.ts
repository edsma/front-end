import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { generoCreacionDto, generoDto } from './Genero/Genero';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  constructor(private http: HttpClient) { }
  private apiUrl = environment.apiUrl + 'Genero';

  public ObtenerPaginados(pagina:number,cantidadRegistrosMostrar:number): Observable<any>{
    let param = new HttpParams();
    param = param.append('pagina',pagina.toString());
    param = param.append('recordsPagina', cantidadRegistrosMostrar.toString());;
    return this.http.get<generoDto[]>(this.apiUrl, {observe: "response", params: param} );
  }

  public ObtenerTodos(){
    return this.http.get<generoDto[]>(`${this.apiUrl}/todos`);
  }

  public ObtenerPorId(id:number): Observable<generoDto>{
    return this.http.get<generoDto>(`${this.apiUrl}/${id}`);
  }

  public crear(genero: generoCreacionDto){
    return this.http.post(this.apiUrl, genero);
  }

  public editar(id:number,genero: generoCreacionDto){
    return this.http.put(`${this.apiUrl}/${id}`,genero);
  }

  public borrar(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
