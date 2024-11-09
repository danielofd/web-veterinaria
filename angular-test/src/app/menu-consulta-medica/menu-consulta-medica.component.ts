import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu-consulta-medica',
  templateUrl: './menu-consulta-medica.component.html',
  styleUrls: ['./menu-consulta-medica.component.css']
})
export class MenuConsultaMedicaComponent {

  constructor(private authService: AuthService,private router: Router,private snackBar: MatSnackBar) {}

  get canCreate() {
    return this.authService.canCreate();
  }

  get canEdit() {
    return this.authService.canEdit();
  }

  get canDelete() {
    return this.authService.canDelete();
  }

  get canConsult() {
    return this.authService.canConsult();
  }

  // Métodos para crear, editar y eliminar registros
  createConsultaMedica() {
    if (this.canCreate) {
      // Redirigir al formulario de creación de expediente
      console.log()
      //this.router.navigate(['/crear-expediente']);
    } else {
      console.log("No tienes permisos para crear expedientes.");
      //alert('No tienes permisos para crear expedientes.');
    }
  }

  editConsultaMedica() {
    if (this.canEdit) {
      // Lógica para editar expediente
      //alert("NO DISPONIBLE POR EL MOMENTO...");
      this.openSnackBar('NO DISPONIBLE POR EL MOMENTO...');

    }
  }

  deleteConsultaMedica() {
    if (this.canDelete) {
      // Lógica para eliminar expediente
      //alert("NO DISPONIBLE POR EL MOMENTO...");
      this.openSnackBar('NO DISPONIBLE POR EL MOMENTO...');
    }
  }

  consultConsultaMedica() {
    if (this.canConsult) {
      // Lógica para eliminar expediente
      //alert("NO DISPONIBLE POR EL MOMENTO...");
      //this.openSnackBar('NO DISPONIBLE POR EL MOMENTO...');
      this.router.navigate(['/consultar-historial-medico']);
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000, // Duración en milisegundos
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
