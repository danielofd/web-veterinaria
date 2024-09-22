import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registro } from 'src/models/registro';

@Injectable({
  providedIn: 'root'
})
export class NuevoExpedienteServiceService {

  constructor(private http: HttpClient) { }

  //método para crear nuevo expediente...
  crearNuevoExpediente(expediente: Registro) {
    //return this.http.post<Registro>("http://localhost:8080/happyfriends/nuevoExpediente", expediente,{ responseType: 'text' });
      return this.http.post<Registro>("http://localhost:8080/happyfriends/nuevoExpediente", expediente,{ responseType: 'text'  as 'json'});
  }
}
