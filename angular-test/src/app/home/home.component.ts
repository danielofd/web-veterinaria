import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  menuOptions: string[] = [];
  expedienteOption: string[]=[];
  citasOption: string[] = [];
  consultasMedicasOption: string[]=[];
  vacunacionOption: string[]=[];


  constructor(
    private snackBar: MatSnackBar, // Inyectar MatSnackBar
    private authService: AuthService
  ){}
  ngOnInit() {
    this.menuOptions = this.authService.getMenuOptions();
    this.expedienteOption = this.menuOptions.filter(option => option === 'expediente');
    this.citasOption = this.menuOptions.filter(option => option === 'citas');
    this.consultasMedicasOption = this.menuOptions.filter(option=> option === 'consulta medica');
    this.vacunacionOption = this.menuOptions.filter(option=> option === 'vacunacion');
  }

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
