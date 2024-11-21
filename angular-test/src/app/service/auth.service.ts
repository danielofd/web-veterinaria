import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../env/env';

/** 
interface User {
  role: 'Admin' | 'Asistente' | 'Veterinario';
}
*/
export class User{
  rolId: number;
    rolNombre: string;
    usuCorreltivo: string;

    constructor(rolId: number, rolNombre: string, usuCorreltivo: string) {
        this.rolId = rolId;
        this.rolNombre = rolNombre;
        this.usuCorreltivo = usuCorreltivo;
    }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  //private apiUrl = 'http://localhost:8080/happyfriends/signin'; //url base del api

  private apiUrl = environment.apiUrl

  //private currentUser: User | null = null;
  private currentUser: User | undefined;

  constructor(private http: HttpClient) {}

  //consulta credenciales en api rest
  login(user: string, password: string): Observable<User>{
    console.log("Usuario: "+user);
    console.log("Contraseña: "+password);

    const body = {
      "usuEmail":user,
      "usuPassword":password
    }

    return this.http.post<User>(this.apiUrl+'/signin', body,{
      headers: {
        'Content-Type': 'application/json' // Asegúrate de enviar el tipo correcto
    }
    });
    
  }
  /** 
  setCurrentUser(user: User) {
    this.currentUser = user;
  }
    */
  //por api
  
  setCurrentUser(user: User) {
    this.currentUser = user;

    //localStorage.setItem(`currentUser`,JSON.stringify(user));
  }
  

  isAdmin(): boolean {
    return this.currentUser?.rolNombre === 'Admin';
  }

  isAssistant(): boolean {
    return this.currentUser?.rolNombre === 'Asistente';
  }

  isVeterinario(): boolean {
    return this.currentUser?.rolNombre === 'Veterinario'; // Método para verificar si es veterinario
  }

  canCreate(): boolean {
    return this.isAdmin() || this.isAssistant();
  }

  canEdit(): boolean {
    return this.isAdmin() || this.isAssistant();
  }

  canDelete(): boolean {
    return this.isAdmin();
  }

  canConsult(): boolean {
    return this.isAdmin() || this.isAssistant() || this.isVeterinario(); //permitidos
  }

  //permisos de menu
  // Método para obtener las opciones de menú permitidas
  getMenuOptions(): string[] {
    if (this.isAdmin()) {
      return ['expediente', 'citas', 'consulta medica', 'vacunacion'];
    } else if (this.isAssistant()) {
      return ['expediente', 'citas'];
    } else if (this.isVeterinario()) {
      return ['expediente'];
    }
    return [];
  }
}
