import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CredencialesUsuario, respuestaAutenticacion, usuarioDto } from './Seguridad';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor(private htppClient: HttpClient) { }
  baseUrl = environment.apiUrl + 'cuentas';
  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'tokenExpiracion';
  private readonly campoRol = 'role';

  obtenerUsuarios(pagina: number, recordsPorPagina: number): Observable<any>{
    let params  = new HttpParams();
    params = params.append('pagina',pagina.toString());
    params = params.append('recordsPorPagina',recordsPorPagina.toString());
    return this.htppClient.get<usuarioDto>(`${this.baseUrl}/listadoUsuarios`, {observe: 'response', params});
  }

  hacerAdmin(usuarioId:string){
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.htppClient.post(`${this.baseUrl}/hacerAdmin`, JSON.stringify(usuarioId), {headers});
  }

  
  removerAdmin(usuarioId:string){
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.htppClient.post(`${this.baseUrl}/removerAdmin`, JSON.stringify(usuarioId), {headers});
  }

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
    return this.obtenerCampoJwt(this.campoRol);
  }

  obtenerToken(){
    return localStorage.getItem(this.llaveToken);
  }

  obtenerCampoJwt(campo: string ): string{
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
