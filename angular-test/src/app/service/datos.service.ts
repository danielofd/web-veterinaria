import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  //para almacenar el codigo del usuario
  private dataSource = new BehaviorSubject<any>(null);

  currentData = this.dataSource.asObservable();

  //metodo para update value
  changeData(data: any){

    console.log("--->recibe parametros de login: "+data)

    this.dataSource.next(data);

    
  }

  //obtener citas guardadas
  buscarCita(fecha: string, hora :string|null, prop:string|null, estado:string): Observable<any[]> {

    // Validar hora: si está vacía, establecerla en null
  if (hora === "") {
    hora = null;
  }

    // Validar hora: si está vacía, establecerla en null
    if (prop === "") {
      prop = null;
    }
  


    const body = {
      fecha: fecha,
      hora: hora,
      propietario: prop,
      estadoIn: estado
    };

    console.log(body);

    return this.http.post<any[]>(this.apiUrl+'/buscarCita', body);
  }

  //servicio rest de eliminacion de cita
  eliminarCita(idCita:string, codUsu:string): Observable<any[]>{


    let numCita:number= parseInt(idCita, 10);;

    //crea request
    const body={

      ctaCodigo: numCita,
      usuCodigo: codUsu

    }
    console.log("[REQUEST A ENVIAR AL SERVICIO REST]");
    console.log(body);

    return this.http.post<any[]>(this.apiUrl+'/cancelarCita', JSON.stringify(body),{

      headers: { 'Content-Type': 'application/json' },
      responseType: 'text' as 'json'

    });
  }


  //buscar expediente
  buscarExpediente(cod: string, mascota :string, prop:string): Observable<any[]> {

    /*
    // Validar hora: si está vacía, establecerla en null
  if (hora === "") {
    hora = null;
  }

    // Validar hora: si está vacía, establecerla en null
    if (prop === "") {
      prop = null;
    }
  */
    // Validar que los parámetros no sean null y asignar una cadena vacía en caso de serlo
  const codigo = cod ?? ''; // Si `cod` es null o undefined, se asigna ''
  const nombreMascota = mascota ?? ''; // Si `mascota` es null o undefined, se asigna ''
  const nombrePropietario = prop ?? ''; // Si `prop` es null o undefined, se asigna ''


    const body = {
      masId: codigo,
      masNombre: nombreMascota,
      masPropietario: nombrePropietario
    };

    console.log(body);

    return this.http.post<any[]>(this.apiUrl+'/buscarExpediente', body);
  }

  //modificar expediente

  // Método POST que recibe los datos del expediente
  modificarExpediente(expediente: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/actualizarExpediente', expediente);
  }


  //guardar consulta medica
  // Método para hacer el POST request
  agregaraConsultaMedica(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/nuevaConsulta', data);
  }


  // Método GET para obtener historial médico, ahora acepta un parámetro empId
  buscarHistorialMedico(empId: number): Observable<any[]> {
    const url = `${this.apiUrl+'/buscarHistorialMedico'}/${empId}`;  // Construimos la URL con el parámetro empId
    return this.http.get<any[]>(url);  // Realizamos la solicitud GET con la URL construida
  }

  //metodo para crear el rol nuevo
  crearRol(rolData: { rolNombre: string, rolDescripcion: string, usuCodigo: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/nuevoRol', rolData);
  }

}
