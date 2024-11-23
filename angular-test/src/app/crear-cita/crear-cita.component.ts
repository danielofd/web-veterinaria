import { Component, OnInit } from '@angular/core';
import { DatosService } from '../service/datos.service';
import { HttpClient } from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cita } from 'src/models/cita';
import { environment } from '../env/env';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css']
})
export class CrearCitaComponent implements OnInit {

  private apiUrl = environment.apiUrl;

  veterinarios: any[] = [];
  horarios: any[] = [];
  selectedVeterinarioId: number | null = null;
  selectedFecha: string = ''; // Fecha seleccionada
  selectedHorario: string = '';

  fechaHoraFormat: string = '';

 cita: Cita = new Cita();

 formularioRegistro: FormGroup;

 selectedVeterinario: string = '';
  codigoUsu: string = '';

  constructor(private form: FormBuilder, private router: Router,private datosService: DatosService, private http: HttpClient, private snackBar: MatSnackBar, private dialog: MatDialog){
    this.formularioRegistro = this.form.group({
      /*
      fecha: [''], //tamaño 50
      veter: [''], //tamaño 50
      hora: [''],
      nombrePropietario: ['',[Validators.required, this.textOnlyValidator]]
      */
      fecha: [null, Validators.required],
      nombrePropietario: ['', [Validators.required, this.textValidator]],
      veter: [null, Validators.required],
      hora: [null, Validators.required],
    })
  }

  textValidator(control: any) {
    const regex = /^[A-Za-z\s]+$/; // Solo letras y espacios
    return regex.test(control.value) ? null : { invalidText: true };
  }

  ngOnInit(): void {
    this.cargarVeterinarios();
  }

  
  textOnlyValidator(control: any) {
    const regex = /^[a-zA-Z\s]*$/; // Solo letras y espacios
    return regex.test(control.value) ? null : { invalidText: true };
  }



  cargarVeterinarios(): void {
    
    this.datosService.obtenerVeterinarios().subscribe(
      (data) => {
        console.log(data);
        this.veterinarios = data;
      },
      (error) => {
        console.error('Error al cargar veterinarios', error);
      }
    );
    
   
  }
 

  onVeterinarioChange(event: Event): void {
   

    const selectElement = event.target as HTMLSelectElement; // Casting a HTMLSelectElement
    const empId = selectElement.value;

    if (empId) {
        this.selectedVeterinarioId = +empId; // Convertir a número
        this.cargarHorarios(); // Cargar horarios para el veterinario seleccionado
    } else {
        this.selectedVeterinarioId = null;

        // Limpiar horarios y el campo de hora si no hay veterinario seleccionado
        this.horarios = [];
        this.formularioRegistro.get('hora')?.reset(); // Limpiar el campo de hora
    }

    // Si deseas guardar el nombre del veterinario seleccionado
    const selectedVet = this.veterinarios.find(vet => vet.empId.toString() === empId);
    if (selectedVet) {
        this.selectedVeterinario = `${selectedVet.empNombre} ${selectedVet.empApellido}`;
        // Aquí puedes usar selectedVeterinario para tu servicio POST
        console.log(this.selectedVeterinario);
    }
}





  cargarHorarios(): void {
    if (this.selectedVeterinarioId && this.selectedFecha) {
      this.datosService.obtenerHorarios(this.selectedFecha, this.selectedVeterinarioId).subscribe(
        (data) => {
          console.log(data);
          this.horarios = data;
        },
        (error) => {
          console.error('Error al cargar horarios', error);
        }
      );
    }
  }

  // onFechaChange(fecha: string): void {
  //   this.selectedFecha = fecha;
  //   this.cargarHorarios();
  // }
  onFechaChange(event: Event): void {
    //limpia horarios 
    
    const inputElement = event.target as HTMLInputElement; // Casting a HTMLInputElement
    const fecha = inputElement.value;

    if (fecha) {
        this.selectedFecha = fecha;  // Actualiza la fecha seleccionada
        
        if (this.selectedVeterinarioId) {
            this.cargarHorarios(); // Carga horarios si ya hay un veterinario seleccionado
        }
    }
}

onHorarioChange(event: Event): void {
  const selectElement = event.target as HTMLSelectElement; // Casting a HTMLSelectElement
  this.selectedHorario = selectElement.value; // Obtiene el valor seleccionado
}

generarCita(): void {

  

  const formValue = this.formularioRegistro.value;

  console.log(this.selectedVeterinarioId);
  console.log(this.selectedFecha);
  console.log(this.selectedHorario);

  if (this.selectedVeterinarioId && this.selectedFecha && this.selectedHorario) {

    this.fechaHoraFormat =  this.formatFechaHora(this.selectedFecha, this.selectedHorario);

    console.log(this.fechaHoraFormat);

    this.datosService.currentData.subscribe(data =>{
      console.log("usu correlativo: "+data);
      this.codigoUsu = data.usuCorreltivo
    });

  

    const citaData = {
      empId: this.selectedVeterinarioId,
      ctaEstado:  1,
      ctaFecHora: this.fechaHoraFormat,
      //ctaPropietario: this.selectedVeterinario,

      ctaPropietario:formValue.nombrePropietario.toUpperCase(),
      usuCodigo: this.codigoUsu,
      //horario: this.selectedHorario
    };

    console.log(JSON.stringify(citaData));

    this.http.post(this.apiUrl+'/crearCita', citaData, {

        headers: { 'Content-Type': 'application/json' },
        responseType: 'text' as 'json'

      })
      .subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response); 
          // Aquí puedes agregar más lógica, como mostrar un mensaje de éxito
          this.formularioRegistro.reset();
          // Limpia el formulario y restablece los horarios

          //select horarios disponibles se limpia
          this.formularioRegistro.get('hora')?.setValue('');

          this.formularioRegistro.get('hora')?.setValue(null);
          this.horarios=[];
      
          this.selectedVeterinarioId=null;
          this.selectedFecha='';
      
      //this.veterinarios= [];
 
      //this.selectedVeterinarioId = 0;
      //this.selectedFecha = ''; // Fecha seleccionada
      //this.selectedHorario = '';
      //this.horarios=[];
         
          this.procesoMsg('REGISTRO GUARDADO CON EXITO.');
        },
        (error) => {
          console.error('Error al generar la cita', error);
          // Maneja el error aquí
        }
      );
  } else {
    console.error('Por favor, complete todos los campos antes de generar la cita.');
  }
  //this.formularioRegistro.reset();
}

formatFechaHora(fecha: string, horario: string): string {
  const [year, month, day] = fecha.split('-'); // Supone que fecha está en formato 'YYYY-MM-DD'
  const formattedDate = new Date(`${year}-${month}-${day}T${horario}:00`); // Crea un objeto Date

  // Obtén los componentes de la fecha
  const y = formattedDate.getFullYear();
  const m = String(formattedDate.getMonth() + 1).padStart(2, '0'); // Mes de 0 a 11
  const d = String(formattedDate.getDate()).padStart(2, '0');
  const hr = String(formattedDate.getHours()).padStart(2, '0');
  const min = String(formattedDate.getMinutes()).padStart(2, '0');

  return `${y}-${m}-${d} ${hr}:${min}:00`; // Retorna el formato 'YYYY-MM-DD HH:mm:ss'
}

regresar(): void {
  // Ejemplo de redirección a una ruta específica
  this.router.navigate(['/menu-citas']); // Cambia '/menu' a la ruta que necesites
}

limpiar(): void {
  this.formularioRegistro.reset();
  this.veterinarios=[];
  this.horarios=[];
}

guardarCita(){

  //valida campos obligatorios antes de guardar
  if (this.formularioRegistro.get('fecha')?.invalid ||
  this.formularioRegistro.get('nombrePropietario')?.invalid ||
  this.formularioRegistro.get('veter')?.invalid ||
  this.formularioRegistro.get('hora')?.invalid) {
    // Aquí puedes mostrar un mensaje o hacer algo en caso de que el formulario sea inválido
    this.procesoMsg('POR FAVOR COMPLETAR TODOS LOS CAMPOS OBLIGATORIOS(*).');
    return; // Evita continuar si el formulario no es válido
}


  const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Lógica para guardar el expediente
        this.generarCita();
      } else {
        console.log('Guardado cancelado');
      }
    });

}

procesoMsg(msj: string) {
  const snackBarRef = this.snackBar.open(msj, 'Cerrar', {
    duration: 20000,
    panelClass: ['snackbar-confirm'],
    verticalPosition: 'top'
  });


}

// En tu componente TypeScript
validateAlpha(event: KeyboardEvent): void {
  const regex = /^[A-Za-z\s]*$/;  // Solo permite letras y espacios
  const char = event.key;

  if (!regex.test(char)) {
      event.preventDefault();  // Bloquea la tecla si no es una letra o espacio
  }
}
}
