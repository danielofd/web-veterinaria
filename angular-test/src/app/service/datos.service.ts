import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Raza } from 'src/models/raza';
import { TipoMascota } from 'src/models/tipo-mascota';
import { environment } from '../env/env';
import { Veterinario } from 'src/models/veterinario';
import { Horario } from 'src/models/Horario';

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

  obtenerVeterinarios(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(this.apiUrl+'/obtenerEmpleados/3');
  }

  obtenerHorarios(fecha: string, empId: number): Observable<Horario[]> {
    const requestBody = { hocFecha: fecha, empId: empId };
    return this.http.post<Horario[]>(this.apiUrl+'/horarios', requestBody);
  }

  

}
