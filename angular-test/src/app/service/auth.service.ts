import { Injectable } from '@angular/core';

interface User {
  role: 'admin' | 'asistente' | 'veterinario';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User | null = null;

  constructor() {}

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  isAssistant(): boolean {
    return this.currentUser?.role === 'asistente';
  }

  isVeterinario(): boolean {
    return this.currentUser?.role === 'veterinario'; // Método para verificar si es veterinario
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
      return ['expediente', 'consulta medica', 'vacunacion'];
    }
    return [];
  }
}
