import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosService } from '../service/datos.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../loading.service';
import { GlobalService } from '../global.service';

// Asegúrate de que la librería bootstrap esté importada globalmente
declare var bootstrap: any;  // Esto es necesario para que TypeScript reconozca 'bootstrap'


@Component({
  selector: 'app-consultar-expediente',
  templateUrl: './consultar-expediente.component.html',
  styleUrls: ['./consultar-expediente.component.css']
})
export class ConsultarExpedienteComponent {

  isLoadingQuery: boolean = false;  // Variable para controlar el estado de carga del botón

  formulario: FormGroup;

  detalleExpediente: any = null;

  selectedRegistro: any;   // Registro seleccionado para el modal

  isFocused: boolean = false;
  isFocused2: boolean = false;

  registros: any[] = []; // Arreglo para almacenar los registros

  isLoading = false; // Esta propiedad controlará la visibilidad de la fila "Cargando..."  

  usuarioRol: string="";

  constructor(private fb: FormBuilder, private datosService: DatosService, 
    private router: Router, private snackBar: MatSnackBar, private globalService: GlobalService) {
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


    //recupera info login
    this.datosService.currentData.subscribe(data =>{
      console.log("usu correlativo: "+data.rolNombre);
      this.usuarioRol = data.rolNombre
    });

  
  }



  abrirModalDetalles(registro: any) {
    // Asignamos el detalle del expediente a la variable
    this.detalleExpediente = registro;

    console.log("---------registro seleccionado----------")
    console.log(this.detalleExpediente)
    // Mostramos el modal
    const modal = new bootstrap.Modal(document.getElementById('modalDetallesExpediente')!);
    modal.show();
  }

  abrirModalConsultaMedica(registro: any) {
    // Aquí puedes guardar el registro si necesitas usarlo en el modal
    // Luego, abre el modal para las opciones de consulta médica.

    this.selectedRegistro = registro;  // Asignamos el registro seleccionado

    console.log("regitro: " +this.selectedRegistro);

    const modalElement = document.getElementById('modalConsultaMedica');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }


  consultarExpediente() {
    console.log('probando consulta...');

    //limpia la tabla
    this.registros=[];

    this.isLoading = true; // Mostrar "Cargando..." al empezar a cargar los datos
    

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

      this.isLoading = false; // Ocultar "Cargando..." cuando los datos hayan llegado

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

      this.isLoading = false; // Ocultar "Cargando..." cuando los datos hayan llegado
      return; // Cancelar la operación
    }

     // Validar que el campo "nombreMascota" no exceda los 30 caracteres
  if (mascota && mascota.length > 30) {
    console.log('El nombre de la mascota no puede exceder los 30 caracteres.');
    //this.openSnackBar("El nombre de la mascota no puede exceder los 30 caracteres.");
    this.isLoading = false; // Ocultar "Cargando..." cuando los datos hayan llegado
    return; // Detenemos el flujo si la validación falla
  }
  

    console.log("fecha => "+cod);
    console.log("hora => "+mascota);
    console.log("propietario => "+propietario);

    this.isLoadingQuery = true; //deshabilita boton consultar
    
      this.datosService.buscarExpediente(cod,mascota,propietario).subscribe(
        (data) => {

          console.log('Datos recibidos:', data); // Para depuración


          if (!data || data.length === 0) {
            // Si data es null, undefined o un array vacío, imprime el mensaje
            console.log('No existen datos');
            this.openSnackBar("NO HAY REGISTROS RELACIONADO CON LA BUSQUEDA.");
            this.isLoading = false; // Ocultar "Cargando..." cuando los datos hayan llegado
            this.isLoadingQuery = false; //habilita boton consultar
            return;
          } else {
            // Si data tiene contenido, asignar los datos a registros y reiniciar el formulario
            console.log('Datos recibidos:', data); // Para depuración
            this.registros = data; // Asignar los datos a registros
            this.formulario.reset(); // Reiniciar el formulario
            this.isLoading = false; // Ocultar "Cargando..." cuando los datos hayan llegado
            this.isLoadingQuery = false; //habilita boton consultar
          }



          
        },
        (error) => {
          console.error('Error al buscar citas', error);
          // Puedes mostrar un mensaje al usuario aquí
          this.isLoading = false; // Ocultar "Cargando..." cuando los datos hayan llegado
          this.isLoadingQuery = false; //habilita boton consultar
        }
      );

   
    
  }

  regresar(): void {
    // Ejemplo de redirección a una ruta específica
    this.router.navigate(['/menu-expediente']); // Cambia '/menu' a la ruta que necesites
  }

  
  //editarRegistro(index: number) {
    editarRegistro(registro: any) {
    //const registro = this.registros[index];
    console.log(registro);
    this.formulario.patchValue(registro); // Cargar los valores en el formulario
    //this.registros.splice(index, 1); // Eliminar el registro del array

     // Cerrar el modal antes de redirigir
     const modalElement = document.getElementById('modalDetallesExpediente');
     const modal = bootstrap.Modal.getInstance(modalElement!);  // Obtener la instancia del modal
     modal.hide();  // Cerrar el modal

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

//para agregar consulta medica
agregarConsulta(registro: any) {
  //const registro = this.registros[index];
  console.log(registro);
  this.formulario.patchValue(registro); // Cargar los valores en el formulario
  //this.registros.splice(index, 1); // Eliminar el registro del array


    // Cerrar el modal antes de redirigir
    const modalElement = document.getElementById('modalConsultaMedica');
    const modal = bootstrap.Modal.getInstance(modalElement!);  // Obtener la instancia del modal
    modal.hide();  // Cerrar el modal

    console.log("Entra a metodo agregar consulta"+modal)


  //redirige al componente modificar cita
  this.router.navigate(['agregar-consulta-medica', { data: JSON.stringify(registro) }]);

}

verHistorialMedico(registro: any) {
  //const registro = this.registros[index];
  console.log(registro);
  this.formulario.patchValue(registro); // Cargar los valores en el formulario
  //this.registros.splice(index, 1); // Eliminar el registro del array

  this.datosService.buscarHistorialMedico(registro.expId).subscribe(
    (data) => {
      console.log("---respuesta recibida: "+data)

      if (data && data.length > 0) {
        // Si hay datos, asignamos las consultas y mostramos mensaje de éxito
        //this.consultas = data;
        console.log("---Consultas cargadas exitosamente.");

        this.globalService.changeData(registro);

        //redirige al componente modificar cita
        //this.router.navigate(['/ver-historial-medico', { data: JSON.stringify(registro) }]);
        this.router.navigate(['/ver-historial-medico']);
      } else {
        // Si no hay datos, mostramos mensaje indicando que no hay consultas
        console.log("---No tiene consultas médicas.");
        this.openSnackBar("ESTE EXPEDIENTE NO TIENE CONSULTAS MEDICAS.");
        return;
      }


      //this.consultas = data;  // Asignamos la respuesta del GET a la variable consultas
    },
    (error) => {
      console.error('Error al cargar las consultas:', error);
    }

    
  );

  // Cerrar el modal antes de redirigir
  const modalElement = document.getElementById('modalConsultaMedica');
  const modal = bootstrap.Modal.getInstance(modalElement!);  // Obtener la instancia del modal
  modal.hide();  // Cerrar el modal
  
}

}
