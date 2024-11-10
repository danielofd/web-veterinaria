import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatosService } from '../service/datos.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consultar-historial-medico',
  templateUrl: './consultar-historial-medico.component.html',
  styleUrls: ['./consultar-historial-medico.component.css']
})
export class ConsultarHistorialMedicoComponent {

  isCodigoExpedienteFocused: boolean = false;

  isCodigoExpedienteInvalid: boolean = false;

   // Propiedad que controla si el campo de "Nombre de Mascota" está enfocado
   isNombreMascotaFocused: boolean = false;
  
   // Propiedad para mostrar el mensaje de error
   isNombreMascotaInvalid: boolean = false;

   isNombrePropietarioFocused: boolean = false;
  isNombrePropietarioInvalid: boolean = false;
  
  formulario: FormGroup;

  registros: any[] = []; // Arreglo para almacenar los registros

  constructor(private fb: FormBuilder, private datosService: DatosService, private router: Router, private snackBar: MatSnackBar) {
    this.formulario = this.fb.group({
      codigoExpediente:[],
      nombreMascota:[],
      nombrePropietario:[]
    });
  }


  consultarExpedienteHistorial() {
    console.log('probando consulta historial medico');

    const cod = this.formulario.value.codigoExpediente; // Obtener la fecha del formulario

    const mascota = this.formulario.value.nombreMascota;

    const propietario = this.formulario.value.nombrePropietario;


    if (!cod && !mascota && !propietario) {
      // Si ninguno de los tres campos tiene valor
      console.log('Debe colocar un parámetro de búsqueda en los tres campos: Código, Mascota o Propietario.');
      this.openSnackBar("REALIZE UNA BUSQUEDA POR LOS SIGUIENTES CAMPOS:\nCODIGO DE EXPEDIENTE\nNOMBRE MASCOTA o PROPIETARIO");
      return;
    } 

    //validamos campos
    if (cod && cod.length !== 8) {
      // Si el código no tiene exactamente 8 caracteres, no es válido
      console.log("El código de expediente debe tener exactamente 8 dígitos.");
      //this.openSnackBar("El código debe tener exactamente 8 dígitos.");
      return; // Cancelar la operación
    }

    //fecha quemada
    //const fecha='2024-10-08';

    console.log("fecha => "+cod);
    console.log("hora => "+mascota);
    console.log("propietario => "+propietario);
    
      this.datosService.buscarExpediente(cod,mascota,propietario).subscribe(
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
            this.formulario.reset(); // Reiniciar el formulario
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
    this.router.navigate(['/menu-consulta-medica']); // Cambia '/menu' a la ruta que necesites
  }

  verHistorialMedico(index: number) {
    const registro = this.registros[index];
    console.log(registro);
    this.formulario.patchValue(registro); // Cargar los valores en el formulario
    //this.registros.splice(index, 1); // Eliminar el registro del array

    //redirige al componente modificar cita
    //this.router.navigate(['/modificar-expediente', { data: JSON.stringify(registro) }]);


  }

  agregarConsulta(index: number) {
    const registro = this.registros[index];
    console.log(registro);
    this.formulario.patchValue(registro); // Cargar los valores en el formulario
    //this.registros.splice(index, 1); // Eliminar el registro del array

    //redirige al componente modificar cita
    this.router.navigate(['agregar-consulta-medica', { data: JSON.stringify(registro) }]);


  }

  limpiarFormulario(){
    this.formulario.reset(); // Limpia el formulario
    this.registros=[];
    //this.isFechaRequired = false;  // Muestra el mensaje si la fecha está vacía
    this.isCodigoExpedienteFocused=false;
    this.isCodigoExpedienteInvalid=false;
  }

  // Función para mostrar el mensaje flotante cuando el input recibe el foco
  showCodigoExpedienteMessage(): void {
    this.isCodigoExpedienteFocused = true;
    this.isCodigoExpedienteInvalid = false;  // No mostramos el mensaje de error si se tiene foco
  }

  // Función para ocultar el mensaje flotante cuando el input pierde el foco
  hideCodigoExpedienteMessage(): void {
    // Si el campo tiene longitud incorrecta, se vuelve a mostrar el mensaje
    const codigoExpedienteValue = this.formulario.get('codigoExpediente')?.value;
    if (codigoExpedienteValue && codigoExpedienteValue.length !== 8) {
      this.isCodigoExpedienteInvalid = true;
    }
    this.isCodigoExpedienteFocused = false;
  }

  // En tu componente TypeScript
validateNumber(event: KeyboardEvent): void {
  const regex = /^[0-9]*$/;  // Solo permite números
  const char = event.key;

  if (!regex.test(char)) {
      event.preventDefault();  // Bloquea la tecla si no es un número
  }
}

 //en caso de no existir datos
 openSnackBar(message: string) {
  this.snackBar.open(message, 'Cerrar', {
    duration: 8000, // Duración en milisegundos
    horizontalPosition: 'center',
    verticalPosition: 'top',
  });
}

// Función para manejar el evento focus
showNombreMascotaMessage(): void {
  this.isNombreMascotaFocused = true;  // Mostrar mensaje flotante al hacer foco en el campo
  this.isNombreMascotaInvalid = false; // Ocultar el mensaje de error si el campo tiene foco
}

// Función para manejar el evento blur
hideNombreMascotaMessage(): void {
  this.isNombreMascotaFocused = false; // Ocultar el mensaje de foco cuando el campo pierde el foco

  // Validar si el tamaño del texto es mayor que 40 caracteres
  const nombreMascotaValue = this.formulario.get('nombreMascota')?.value;
  if (nombreMascotaValue && nombreMascotaValue.length > 40) {
    this.isNombreMascotaInvalid = true; // Mostrar mensaje si el tamaño excede los 40 caracteres
  }
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

 // Función que se ejecuta cuando el campo "Nombre del Propietario" recibe el foco
 showNombrePropietarioMessage(): void {
  this.isNombrePropietarioFocused = true;  // Mostrar mensaje flotante al hacer foco en el campo
  this.isNombrePropietarioInvalid = false; // Desactivar el mensaje de error si el campo tiene foco
}

// Función que se ejecuta cuando el campo "Nombre del Propietario" pierde el foco
hideNombrePropietarioMessage(): void {
  this.isNombrePropietarioFocused = false; // Ocultar el mensaje de foco cuando el campo pierde el foco

  // Validar si el tamaño del texto es mayor que 40 caracteres
  const nombrePropietarioValue = this.formulario.get('nombrePropietario')?.value;
  if (nombrePropietarioValue && nombrePropietarioValue.length > 40) {
    this.isNombrePropietarioInvalid = true;  // Mostrar mensaje si el tamaño excede los 40 caracteres
  }
}
  

}
