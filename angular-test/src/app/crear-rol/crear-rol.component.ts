import { Component, OnInit } from '@angular/core';
import { DatosService } from '../service/datos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-rol',
  templateUrl: './crear-rol.component.html',
  styleUrls: ['./crear-rol.component.css']
})
export class CrearRolComponent implements OnInit  {

  formulario: FormGroup;  // Aquí creamos el FormGroup

  isSubmitting: boolean = false; // Propiedad para controlar el estado del botón

  showAlert: boolean = false;  // Variable para controlar la visibilidad del mensaje

  showAlertDesc: boolean =false;

  rolNombre: string = '';
  rolDescripcion: string = '';
  usuCodigo: string = ""; // Usualmente se pasaría dinámicamente este valor

  mensaje: string = ''; // Para mostrar mensajes de éxito o error

  constructor(private datosService: DatosService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { 
    // Inicializamos el formulario con validaciones
    this.formulario = this.fb.group({
      rolNombre: ['', [Validators.required]],  // Validación de campo requerido
      rolDescripcion: ['', [Validators.required]]  // Validación de campo requerido
    });
  }

  ngOnInit(): void {
    
  }

  // Método para obtener los controles del formulario
  get f() {
    return this.formulario.get('controlName');
  }

  // Método para enviar el formulario
  // crearRol(): void {
  //   // Marcar todos los campos como tocados para que se muestren los errores
  //   if (this.formulario.invalid) {
  //     this.formulario.markAllAsTouched();
  //   } else {
  //     console.log('Formulario válido', this.formulario.value);
  //   }
  // }


  crearRol() {

    if (this.formulario.valid) {
      // Aquí va la lógica para enviar los datos, por ejemplo, llamar a un servicio


     

      //this.expediente.usuCodigo = 'FD100814';
    this.datosService.currentData.subscribe(data =>{
      console.log("usu correlativo: "+data.usuCorreltivo);
      this.usuCodigo = data.usuCorreltivo
    });

      //crear el obj request
      const rolData = {
        rolNombre: this.rolNombre,
        rolDescripcion: this.rolDescripcion,
        usuCodigo: this.usuCodigo
      };

      console.log("---Datos a enviar: "+rolData);

      //desconemtar return 
      //return;

      const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Lógica para guardar el expediente
        this.realizarGuardado(rolData);
      
      
      } else {
        console.log('Guardado cancelado');
      }
    });
  
      

      console.log('Formulario válido', this.formulario.value);
    } else {
      this.formulario.markAllAsTouched();
      console.log('Formulario no válido');
      this.procesoMsg("DEBE COMPLETAR LOS CAMPOS OBLIGATORIOS(*)");
    }

    
  }
  realizarGuardado(rolData: any) {

     // Deshabilitar el botón mientras se realiza la solicitud
     this.isSubmitting = true;
    
    //realiza la peticion rest
    this.datosService.crearRol(rolData).subscribe({
      next: (response) => {
        console.log("----respuesta recibida: "+JSON.stringify(response));

        if (response.postResponse === 'Ya existe un rol con el mismo nombre') {
          // Si la respuesta contiene el mensaje de error
          console.error('Error: Ya existe un rol con el mismo nombre');
          this.procesoMsg("YA EXISTE UN ROL CON EL MISMO NOMBRE.");
        } else {
          // Si la respuesta es exitosa
          console.log('Éxito: Rol creado correctamente');
          //this.mensaje = 'Rol creado con éxito!';
          this.procesoMsg("ROL "+ this.rolNombre+" CREADO CON EXITO.");

           // Limpiar el formulario después de guardarlo
           this.formulario.reset(); 

        }

         // Deshabilitar el botón mientras se realiza la solicitud
    this.isSubmitting = false;
       
      },
      error: (error) => {
        console.log("----respuesta recibida: "+error);
        this.mensaje = 'Error al crear rol: ' + error.message;
        this.procesoMsg("ERROR AL CREAR EL REGISTRO.");
      }
    });
  }

    // Función para validar que solo se ingresen caracteres alfabéticos y el punto
    validarCaracteres(event: KeyboardEvent): void {
              const tecla = event.key;

          // Expresión regular que permite letras (mayúsculas o minúsculas), el punto (.) y el espacio en blanco
          const regex = /^[a-zA-Z\s.]$/;

          // Si el carácter no coincide con la expresión regular, prevenimos el evento
          if (!regex.test(tecla)) {
            event.preventDefault();  // Esto evitará que el carácter no permitido sea ingresado
          }
    }

    //mensajes de alerta
    procesoMsg(msj: string) {
      const snackBarRef = this.snackBar.open(msj, 'Cerrar', {
        duration: 20000,
        verticalPosition: 'top',
        panelClass: ['snackbar-confirm'],
      });
    
      
    }

    // Método para mostrar el mensaje de alerta cuando el campo recibe el enfoque
  mostrarMensaje(): void {
    this.showAlert = true;  // Mostrar el mensaje
  }



   // Método para ocultar el mensaje cuando el campo pierde el foco
   ocultarMensaje(): void {
    this.showAlert = false;  // Establece la variable en false para ocultar el mensaje
  }

     // Método para mostrar el mensaje de alerta cuando el campo recibe el enfoque
     mostrarMensajeDesc(): void {
      this.showAlertDesc = true;  // Mostrar el mensaje
    }
  
  
  
     // Método para ocultar el mensaje cuando el campo pierde el foco
     ocultarMensajeDesc(): void {
      this.showAlertDesc = false;  // Establece la variable en false para ocultar el mensaje
    }
  

}
