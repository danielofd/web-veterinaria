import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private snackBar: MatSnackBar // Inyectar MatSnackBar
  ){}

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000, // Duración en milisegundos
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  openCitas(){
    this.openSnackBar('NO DISPONIBLE POR EL MOMENTO...');
  }

  openConsultasMedicas(){
    this.openSnackBar('NO DISPONIBLE POR EL MOMENTO...');
  }

  openVacunacion(){
    this.openSnackBar('NO DISPONIBLE POR EL MOMENTO...');
  }


}
