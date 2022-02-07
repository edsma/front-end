import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatearFecha } from '../utilidades/utilidades';
import { LandingPageDto, PeliculaCreacionDto, PeliculaDto, PeliculaPostGet, PeliculaPutGetDto } from './Pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private http: HttpClient) { }
  private apiUrl = environment.apiUrl + "Peliculas";

  public postGet(): Observable<PeliculaPostGet>{
    return this.http.get<PeliculaPostGet>(`${this.apiUrl}/PostGet`);
  }

  public borrar(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  public filtrar(valores:any):Observable<any>{
    const params = new HttpParams({fromObject: valores});
    return this.http.get<PeliculaDto[]>(`${this.apiUrl}/filtrar`, {params,observe: 'response'});
  }

  putGet(id: number): Observable<PeliculaPutGetDto>{
    return this.http.get<PeliculaPutGetDto>(`${this.apiUrl}/PutGet/${id}`);
  }
  public obtenerLandingPage() : Observable<LandingPageDto>{
    return this.http.get<LandingPageDto>(this.apiUrl);
  }

  public obtenerPorId(id: number): Observable<PeliculaDto>{
    return this.http.get<PeliculaDto>(`${this.apiUrl}/${id}`)
  }

  public crear(pelicula: PeliculaCreacionDto){

    const formData = this.construirData(pelicula);
    return this.http.post(this.apiUrl,formData);
  }

  private construirData(pelicula: PeliculaCreacionDto): FormData{
    const formData = new FormData();
    formData.append('titulo',pelicula.titulo);
    formData.append('resumen',pelicula.resumen);
    formData.append('trailer',pelicula.trailer);
    formData.append('enCines',String(pelicula.enCines));
    if(pelicula.fechaLanzamiento){
      formData.append('fechaLanzamiento',formatearFecha(pelicula.fechaLanzamiento));
    }
    if(pelicula.poster){
      formData.append('poster', pelicula.poster);
    }
    formData.append('generosIds', JSON.stringify(pelicula.generosIds));
    formData.append('cinesIds', JSON.stringify(pelicula.cinesIds));
    formData.append('actorCreacionPeliculasDto', JSON.stringify(pelicula.actores));
    
    return formData;
  }
}
