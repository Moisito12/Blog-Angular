import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService {
  public url: string;
  public identity: string;
  public token: string;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  prueba() {
    return 'Prueba de método desde el servicio de usuario';
  }

  register(user):Observable<any>{
      // Pasamos el objeto de usuario a un json string
      let params = JSON.stringify(user);

      // Definimos las cabeceras de la petición
      let headers = new HttpHeaders().set('Content-Type', 'application/json');

      // Realizamos la petición Ajax hacia la api para mandarlo a la base datos
      return this._http.post(this.url+'register', params, {headers: headers});
  }
}
