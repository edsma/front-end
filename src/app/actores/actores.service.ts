import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatearFecha } from '../utilidades/utilidades';
import { actorCreacionDto, actorDto, actorPeliculaDto } from './Actor';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {

  constructor(private http: HttpClient) { }
  private apiUrl = environment.apiUrl + 'actores';
  
  public ObtenerTodos(pagina:number,cantidadRegistrosMostrar:number): Observable<any>{
    let param = new HttpParams();
    param = param.append('pagina',pagina.toString());
    param = param.append('recordsPagina', cantidadRegistrosMostrar.toString());;
    return this.http.get<actorDto[]>(this.apiUrl, {observe: "response", params: param} );
  }

  public crear(actor: actorCreacionDto){
    const formData = this.constuirFormData(actor);
    return this.http.post(this.apiUrl, formData);
  }

  public obtenerPorNombre(nombre:string): Observable<actorPeliculaDto[]>{
    const headers = new HttpHeaders('content-Type: application/json');
    return this.http.post<actorPeliculaDto[]>(`${this.apiUrl}/buscarPorNombre`,
    JSON.stringify(nombre), {headers});
  }

  public ObtenerPorId(id:number): Observable<actorDto>{
    return this.http.get<actorDto>(`${this.apiUrl}/${id}`);
  }

  public editar(id:number,actor: actorCreacionDto){
    const formData = this.constuirFormData(actor);
    return this.http.put(`${this.apiUrl}/${id}`,formData);
  }

  private constuirFormData(actor:actorCreacionDto): FormData{
    const formData = new FormData();
    formData.append('nombre',actor.nombre); 
    formData.append('biografia', actor.biografia)
    if(actor.fechaNacimiento){
      formData.append('fechaNacimiento', formatearFecha(actor.fechaNacimiento));
    }

    if(actor.foto){
      formData.append('foto',actor.foto);
    }

    return formData;
  }

  
  public borrar(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
