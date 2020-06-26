import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService {
  public url: string;
  public identity;
  public token;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  prueba() {
    return 'Prueba de método desde el servicio de usuario';
  }

  register(user): Observable<any> {
    // Pasamos el objeto de usuario a un json string
    let params = JSON.stringify(user);

    // Definimos las cabeceras de la petición
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Realizamos la petición Ajax hacia la api para mandarlo a la base datos
    return this._http.post(this.url + 'register', params, { headers: headers });
  }

  signin(user, getToken = null): Observable<any> {
    if (getToken != null) {
      user.gettoken = getToken;
    }

    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login', params, { headers: headers });
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));

    if (
      identity &&
      identity != null &&
      identity != 'undefined' &&
      identity != undefined
    ) {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem('token');

    if (token && token != null && token != undefined && token != 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }
}
