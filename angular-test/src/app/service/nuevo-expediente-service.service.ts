import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registro } from 'src/models/registro';
import { environment } from '../env/env';

@Injectable({
  providedIn: 'root'
})
export class NuevoExpedienteServiceService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //método para crear nuevo expediente...
  crearNuevoExpediente(expediente: Registro) {
    console.log(expediente);
    //return this.http.post<Registro>("http://localhost:8080/happyfriends/nuevoExpediente", expediente,{ responseType: 'text' });
      return this.http.post<HttpResponse<any>>(this.apiUrl+"/nuevoExpediente", expediente,{ observe: 'response' });
  }
}
