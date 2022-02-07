import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CredencialesUsuario, respuestaAutenticacion } from './Seguridad';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor(private htppClient: HttpClient) { }
  baseUrl = environment.apiUrl + 'cuentas';
  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'tokenExpiracion';
  logeado() : boolean{
    const token = localStorage.getItem(this.llaveToken);
    if(!token){
      return false;
    }
    const expiracion = localStorage.getItem(this.llaveExpiracion);
    const expiracionFecha = new Date(expiracion);
    if(expiracionFecha <= new Date()){
      this.logOut();
      return false;
    } 
    return true;
  }

  logOut(){
    localStorage.removeItem(this.llaveExpiracion);
    localStorage.removeItem(this.llaveToken);
  }

  obtenerRol(): string {
    return 'admin';
  }

  obtenerCampoJwt(campo: string ): string{
    debugger;
    const token = localStorage.getItem(this.llaveToken);
    if(!token){
      return '';
    }
    var campoToken = JSON.parse(atob(token.split('.')[1]));
    return  campoToken[campo];
  }

  registrar(credenciales: CredencialesUsuario): Observable<respuestaAutenticacion>{
    return this.htppClient.post<respuestaAutenticacion>(this.baseUrl + '/crear', credenciales);
  }

  login(credenciales: CredencialesUsuario): Observable<respuestaAutenticacion>{
    return this.htppClient.post<respuestaAutenticacion>(this.baseUrl + '/login', credenciales);
  }

  guardarToken(respuestaAutenticacion: respuestaAutenticacion){
    localStorage.setItem(this.llaveToken, respuestaAutenticacion.token);
    localStorage.setItem(this.llaveExpiracion, respuestaAutenticacion.expiracion.toString());
  }
}
