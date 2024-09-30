import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Raza } from 'src/models/raza';
import { TipoMascota } from 'src/models/tipo-mascota';
import { environment } from '../env/env';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  //private apiUrl = 'http://localhost:8080/happyfriends';
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTipoMascotas():Observable<TipoMascota[]>{
    return this.http.get<TipoMascota[]>(this.apiUrl+'/obtenerTipoMascotas');
  }

  getRazas(value: string):Observable<Raza[]>{
    const id = value;
    if(id===null){
      throw new Error('Tipo de animal no válido');
    }else{
    return this.http.get<Raza[]>(this.apiUrl+'/obtenerRazas/'+id);
  }
  }
}
