import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu-expediente',
  templateUrl: './menu-expediente.component.html',
  styleUrls: ['./menu-expediente.component.css']
})
export class MenuExpedienteComponent {

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
  createExpediente() {
    if (this.canCreate) {
      // Redirigir al formulario de creación de expediente
      this.router.navigate(['/crear-expediente']);
    } else {
      console.log("No tienes permisos para crear expedientes.");
      //alert('No tienes permisos para crear expedientes.');
    }
  }

  editExpediente() {
    if (this.canEdit) {
      // Lógica para editar expediente
      //alert("NO DISPONIBLE POR EL MOMENTO...");
      this.openSnackBar('NO DISPONIBLE POR EL MOMENTO...');

    }
  }

  deleteExpediente() {
    if (this.canDelete) {
      // Lógica para eliminar expediente
      //alert("NO DISPONIBLE POR EL MOMENTO...");
      this.openSnackBar('NO DISPONIBLE POR EL MOMENTO...');
    }
  }

  consultExpediente() {
    if (this.canConsult) {
      // Lógica para eliminar expediente
      //alert("NO DISPONIBLE POR EL MOMENTO...");
      //this.openSnackBar('NO DISPONIBLE POR EL MOMENTO...');
      this.router.navigate(['/consultar-expediente']);
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
