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

  isFocused: boolean = false;

  isFechaRequired: boolean = false;

  isSubmitted = false; // Controla si se ha enviado el formulario

  registros: any[] = []; // Arreglo para almacenar los registros

  constructor(private fb: FormBuilder, private datosService: DatosService, private router: Router, private snackBar: MatSnackBar,private dialog: MatDialog) {
    this.formulario = this.fb.group({
      fecha: ['', Validators.required],
      hora: [''],
      nombrePropietario: [''],
      estado: ['']  // Iniciar el valor por defecto como vacío (para seleccionar "TODAS")
    });
  }

 
  consultarCita() {
    console.log('probando consulta...');

    //valida campos obligatorios antes de guardar
  if (this.formulario.get('fecha')?.invalid) {
    // Aquí puedes mostrar un mensaje o hacer algo en caso de que el formulario sea inválido
    this.procesoMsg('POR FAVOR COMPLETAR TODOS LOS CAMPOS OBLIGATORIOS(*).');
    this.isFechaRequired = true;  // Muestra el mensaje si la fecha está vacía
    return; // Evita continuar si el formulario no es válido
  }
  //validar select estado
  this.isSubmitted = true;  // Indica que se ha enviado el formulario

   

    const fecha = this.formulario.value.fecha; // Obtener la fecha del formulario

    const hora = this.formulario.value.hora;

    const propietario = this.formulario.value.nombrePropietario;

    const estado = this.formulario.value.estado;

    //fecha quemada
    //const fecha='2024-10-08';

    console.log("fecha => "+fecha);
    console.log("hora => "+hora);
    console.log("propietario => "+propietario);
    console.log("estado => "+estado);


    if (this.formulario.valid) {
      console.log(this.formulario.value);  // Mostrar el valor del formulario en la consola
    } else {
      console.log('Formulario inválido');
    }

    
      this.datosService.buscarCita(fecha,hora,propietario,estado).subscribe(
        (data) => {

            
          if (!data || data.length === 0) {
            // Si data es null, undefined o un array vacío, imprime el mensaje
            console.log('No existen datos');
            this.openSnackBar("NO HAY REGISTROS RELACIONADO CON LA BUSQUEDA.");
            return;
          } else {
            // Si data tiene contenido, asignar los datos a registros y reiniciar el formulario
            console.log('Datos recibidos:', data); // Para depuración
            this.registros = data; // Asignar los datos a registros
            //this.formulario.reset(); // Reiniciar el formulario

            this.formulario.reset({
              estado: ''  // Establecer "TODAS" como valor por defecto
            });
            
          }





          
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
           usuCod = data.usuCorreltivo;
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

             this.formulario.reset({
              estado: ''  // Establecer "TODAS" como valor por defecto
            });
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

  //uppercase
  toUpperCase(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.toUpperCase(); // Convierte el texto a mayúsculas
  }

  // En tu componente TypeScript
validateAlpha(event: KeyboardEvent): void {
  const regex = /^[A-Za-z\s]*$/;  // Solo permite letras y espacios
  const char = event.key;

  if (!regex.test(char)) {
      event.preventDefault();  // Bloquea la tecla si no es una letra o espacio
  }
}


  procesoMsg(msj: string) {
    const snackBarRef = this.snackBar.open(msj, 'Cerrar', {
      duration: 20000,
      panelClass: ['snackbar-confirm'],
      verticalPosition: 'top',
    });
  
  
  }

  limpiarFormulario(){
    this.formulario.reset(); // Limpia el formulario
    this.registros=[];
    this.isFechaRequired = false;  // Muestra el mensaje si la fecha está vacía

    this.formulario.reset({
      estado: ''  // Establecer "TODAS" como valor por defecto
    });

  }

  // Función para mostrar el mensaje flotante cuando el input recibe el foco
  showWarningMessage(): void {
    this.isFocused = true;
  }

  // Función para ocultar el mensaje flotante cuando el input pierde el foco
  hideWarningMessage(): void {
    this.isFocused = false;
  }

  //en caso de no existir datos
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 8000, // Duración en milisegundos
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }


  
  // Método para obtener el texto del estado
  getEstadoTexto(estado: number): string {
    switch(estado) {
      case 0:
        return 'VENCIDA';
      case 1:
        return 'ACTIVA';
      case 2:
        return 'CANCELADA';
      default:
        return 'DESCONOCIDO'; // Opcional, por si el estado no es 0, 1 o 2
    }
  }

}
