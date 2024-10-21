import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu-citas',
  templateUrl: './menu-citas.component.html',
  styleUrls: ['./menu-citas.component.css']
})
export class MenuCitasComponent {

  
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
  createCita() {
    if (this.canCreate) {
      // Redirigir al formulario de creación de expediente
      this.router.navigate(['/crear-cita']);
    } else {
      console.log("No tienes permisos para crear expedientes.");
      //alert('No tienes permisos para crear expedientes.');
    }
  }

  editCita() {
    if (this.canEdit) {
      // Lógica para editar expediente
      //alert("NO DISPONIBLE POR EL MOMENTO...");
      this.openSnackBar('NO DISPONIBLE POR EL MOMENTO...');

    }
  }

  deleteCita() {
    if (this.canDelete) {
      // Lógica para eliminar expediente
      //alert("NO DISPONIBLE POR EL MOMENTO...");
      this.openSnackBar('NO DISPONIBLE POR EL MOMENTO...');
    }
  }

  consultCita() {
    /*
    if (this.canConsult) {
      // Lógica para eliminar expediente
      //alert("NO DISPONIBLE POR EL MOMENTO...");
      this.openSnackBar('NO DISPONIBLE POR EL MOMENTO...');
    }
      */
    
    if (this.canConsult) {
      // Redirigir al formulario de creación de expediente
      this.router.navigate(['/consultar-cita']);
    } else {
      console.log("No tienes permisos para consultar expedientes.");
      //alert('No tienes permisos para crear expedientes.');
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
