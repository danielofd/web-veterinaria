import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosService } from '../service/datos.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-consultar-cita',
  templateUrl: './consultar-cita.component.html',
  styleUrls: ['./consultar-cita.component.css']
})
export class ConsultarCitaComponent {

  formulario: FormGroup;

  registros: any[] = []; // Arreglo para almacenar los registros

  constructor(private fb: FormBuilder, private datosService: DatosService, private router: Router, private snackBar: MatSnackBar,private dialog: MatDialog) {
    this.formulario = this.fb.group({
      fecha: ['', Validators.required],
      hora: [''],
      nombrePropietario: ['']
    });
  }

 
  consultarCita() {
    console.log('probando consulta...');

    //valida campos obligatorios antes de guardar
  if (this.formulario.get('fecha')?.invalid) {
    // Aquí puedes mostrar un mensaje o hacer algo en caso de que el formulario sea inválido
    this.procesoMsg('POR FAVOR COMPLETAR TODOS LOS CAMPOS OBLIGATORIOS(*).');
    return; // Evita continuar si el formulario no es válido
}


    const fecha = this.formulario.value.fecha; // Obtener la fecha del formulario

    const hora = this.formulario.value.hora;

    const propietario = this.formulario.value.nombrePropietario;

    //fecha quemada
    //const fecha='2024-10-08';

    console.log("fecha => "+fecha);
    console.log("hora => "+hora);
    console.log("propietario => "+propietario);
    
      this.datosService.buscarCita(fecha,hora,propietario).subscribe(
        (data) => {
          console.log('Datos recibidos:', data); // Para depuración
          this.registros = data; // Asignar los datos a registros
          this.formulario.reset(); // Reiniciar el formulario
        },
        (error) => {
          console.error('Error al buscar citas', error);
          // Puedes mostrar un mensaje al usuario aquí
        }
      );
    
  }

  regresar(): void {
    // Ejemplo de redirección a una ruta específica
    this.router.navigate(['/menu-citas']); // Cambia '/menu' a la ruta que necesites
  }

  //metodo para modificar la cita seleccionada
  editarRegistro(index: number) {
    const registro = this.registros[index];
    console.log(registro);
    this.formulario.patchValue(registro); // Cargar los valores en el formulario
    //this.registros.splice(index, 1); // Eliminar el registro del array

    //redirige al componente modificar cita
    this.router.navigate(['/modificar-cita', { data: JSON.stringify(registro) }]);


  }

  //Cuadro de confirmacion de eliminacion de cita
  eliminarRegistro(index: number) {
    //this.registros.splice(index, 1); // Eliminar el registro del array

    const dialogRef = this.dialog.open(DeleteDialogComponent,
      {
        data: {
          message: 'cancelar esta cita' // Aquí pasamos el texto que se mostrará en el diálogo
        }
      }
    );

    let usuCod: string = "";


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Lógica para guardar el expediente
        //this.generarCita();
        
        //recupera la cita selected
        const registro = this.registros[index];
        console.log(registro);

        // Ahora guardamos el valor de 'id' en una variable numérica
        //let idNumerico: number = registro.id;  // Asignamos el valor de 'id' a la variable 'idNumerico'



        console.log("CITA ELIMINARA CON EXITO");
        this.datosService.currentData.subscribe(data =>{
          //console.log("usu correlativo: "+data);
           usuCod = data;
          console.log("cod usuario:=>"+usuCod)
          
        });

        //realiza peticion
        this.datosService.eliminarCita(registro.id,usuCod).subscribe(
          (data) => {
            console.log('Datos recibidos:', data); // Para depuración
            //this.registros = data; // Asignar los datos a registros
            //this.formulario.reset(); // Reiniciar el formulario

            //this.procesoMsg(data.toString());

            
            if (data.toString() === "Cita cancelada") {
              console.log("exitoso");  // Si el mensaje es "Cita cancelada"
              this.procesoMsg(data.toString());

              // Limpia formulario despues de cancelar cita
             this.formulario.reset();
              //limpia tabla
             this.registros=[];
            } else {
              console.log("fallido");   // Si el mensaje no es "Cita cancelada"

              //devuelve mensaje de error
              this.procesoMsg(data.toString());

            }
            

          },
          (error) => {

            console.error('Error al buscar citas');
            console.log(error);
            // Puedes mostrar un mensaje al usuario aquí
          }
        );

      } else {
        console.log('eliminacion cancelado');
      }
    });

  }



  procesoMsg(msj: string) {
    const snackBarRef = this.snackBar.open(msj, 'Cerrar', {
      duration: 20000,
      panelClass: ['snackbar-confirm'],
    });
  
  
  }

}
