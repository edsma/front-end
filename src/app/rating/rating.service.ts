import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private httpClient: HttpClient) { }
  apiUrl = environment.apiUrl + 'rating';

  rate(peliculaId: number,puntuacion: number)
  {
    return this.httpClient.post(this.apiUrl, {peliculaId, puntuacion});
  }
}
