import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosService } from '../service/datos.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-consultar-expediente',
  templateUrl: './consultar-expediente.component.html',
  styleUrls: ['./consultar-expediente.component.css']
})
export class ConsultarExpedienteComponent {

  formulario: FormGroup;

  isFocused: boolean = false;
  isFocused2: boolean = false;

  registros: any[] = []; // Arreglo para almacenar los registros

  constructor(private fb: FormBuilder, private datosService: DatosService, private router: Router, private snackBar: MatSnackBar) {
    this.formulario = this.fb.group({
      codigoExpediente:['',[ 
        Validators.pattern(/^\d{8}$/),
        Validators.minLength(8) 
        
      ]],
      nombreMascota:['',[
        Validators.pattern(/^\d{50}$/),
        Validators.maxLength(40)
      ]],
      nombrePropietario:[]
    });
  }


  consultarExpediente() {
    console.log('probando consulta...');

    //valida campos obligatorios antes de guardar
  //if (this.formulario.get('fecha')?.invalid) {
    // Aquí puedes mostrar un mensaje o hacer algo en caso de que el formulario sea inválido
    //this.procesoMsg('POR FAVOR COMPLETAR TODOS LOS CAMPOS OBLIGATORIOS.');
    //return; // Evita continuar si el formulario no es válido
  //}


    const cod = this.formulario.value.codigoExpediente; // Obtener la fecha del formulario

    const mascota = this.formulario.value.nombreMascota;

    const propietario = this.formulario.value.nombrePropietario;

    //valida que al menos debe haber un valor en los campos de busqueda
    // Validar si al menos uno de los campos tiene un valor
    if (!cod && !mascota && !propietario) {
      // Si ninguno de los tres campos tiene valor
      console.log('Debe colocar un parámetro de búsqueda en los tres campos: Código, Mascota o Propietario.');
      this.openSnackBar("INGRESE UN PARAMETRO DE BUSQUEDA EN:\nCODIGO EXPEDIENTE, NOMBRE DE MASCOSTA O PROPIETARIO.");
      return;
    } 
    /*
    else {
      // Si al menos uno de los campos tiene valor
      console.log('Parámetros de búsqueda válidos:', { cod, mascota, propietario });
    }
    */
    //fecha quemada
    //const fecha='2024-10-08';

    //validamos campos
    if (cod && cod.length !== 8) {
      // Si el código no tiene exactamente 8 caracteres, no es válido
      console.log("El código de expediente debe tener exactamente 8 dígitos.");
      //this.openSnackBar("El código debe tener exactamente 8 dígitos.");
      return; // Cancelar la operación
    }

     // Validar que el campo "nombreMascota" no exceda los 30 caracteres
  if (mascota && mascota.length > 30) {
    console.log('El nombre de la mascota no puede exceder los 30 caracteres.');
    //this.openSnackBar("El nombre de la mascota no puede exceder los 30 caracteres.");
    return; // Detenemos el flujo si la validación falla
  }
  

    console.log("fecha => "+cod);
    console.log("hora => "+mascota);
    console.log("propietario => "+propietario);
    
      this.datosService.buscarExpediente(cod,mascota,propietario).subscribe(
        (data) => {

          console.log('Datos recibidos:', data); // Para depuración


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
    this.router.navigate(['/menu-expediente']); // Cambia '/menu' a la ruta que necesites
  }

  editarRegistro(index: number) {
    const registro = this.registros[index];
    console.log(registro);
    this.formulario.patchValue(registro); // Cargar los valores en el formulario
    //this.registros.splice(index, 1); // Eliminar el registro del array

    //redirige al componente modificar cita
    this.router.navigate(['/modificar-expediente', { data: JSON.stringify(registro) }]);


  }


  limpiarFormulario(){
    this.formulario.reset(); // Limpia el formulario
    this.registros=[];
  }

  //uppercase
  toUpperCase(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.toUpperCase(); // Convierte el texto a mayúsculas
  }

  // //valida solo numeros enteros
  // validateNumber(event: any) {
  //   // Obtener el valor ingresado
  //   let inputValue = event.target.value;
  
  //   // Remover cualquier carácter no numérico (permitir solo números enteros)
  //   inputValue = inputValue.replace(/[^0-9]/g, '');
  
  //   // Asignar el valor al campo de texto (de nuevo solo números)
  //   event.target.value = inputValue;
  
  //   // Opcional: Si quieres hacer algo más, como asegurarte de que el valor esté en mayúsculas (aunque los números no tienen mayúsculas)
  //   //this.toUpperCase(event);
  // }

  //valida que solo existan caracteres
  // validateAlpha(event: any) {
  //   // Obtener el valor ingresado
  //   let inputValue = event.target.value;
  
  //   // Remover todo lo que no sea una letra (de A-Z o a-z)
  //   inputValue = inputValue.replace(/[^a-zA-Z\s]/g, ''); // Permite letras y espacios
  
  //   // Asignar el valor modificado al campo de entrada
  //   event.target.value = inputValue;
  
  //   // Llamar a la función para convertir el texto a mayúsculas
  //   //this.toUpperCase(event);
  // }

  //en caso de no existir datos
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 8000, // Duración en milisegundos
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }


  // Esta función se ejecuta cuando el usuario hace focus en el input
  showWarningMessage() {
    this.isFocused = true; // Mostrar el mensaje de advertencia al enfocar el campo
  }

  // Si quieres ocultar el mensaje cuando el campo pierde el foco (opcional)
  hideWarningMessage() {
    this.isFocused = false; // Ocultar el mensaje de advertencia cuando el campo pierde el foco
  }

// Esta función se ejecuta cuando el usuario hace focus en el input
showWarningMessage2() {
  this.isFocused2 = true; // Mostrar el mensaje de advertencia al enfocar el campo
}

// Si quieres ocultar el mensaje cuando el campo pierde el foco (opcional)
hideWarningMessage2() {
  this.isFocused2 = false; // Ocultar el mensaje de advertencia cuando el campo pierde el foco
}

// En tu componente TypeScript
validateAlpha(event: KeyboardEvent): void {
  const regex = /^[A-Za-z\s]*$/;  // Solo permite letras y espacios
  const char = event.key;

  if (!regex.test(char)) {
      event.preventDefault();  // Bloquea la tecla si no es una letra o espacio
  }
}

// En tu componente TypeScript
validateNumber(event: KeyboardEvent): void {
  const regex = /^[0-9]*$/;  // Solo permite números
  const char = event.key;

  if (!regex.test(char)) {
      event.preventDefault();  // Bloquea la tecla si no es un número
  }
}

}
