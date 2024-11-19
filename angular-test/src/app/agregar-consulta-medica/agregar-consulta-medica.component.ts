import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosService } from '../service/datos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-consulta-medica',
  templateUrl: './agregar-consulta-medica.component.html',
  styleUrls: ['./agregar-consulta-medica.component.css']
})
export class AgregarConsultaMedicaComponent implements OnInit {

  formulario: FormGroup;

  veterinarios: any[] = [];

  idEmpleado : number =0;
  idExpediente: number=0;

  codEmp: string="";

  usuCod: string="";

  usuarioRol: string=""; // Aquí se almacena el rol del usuario

  selectedVetName: string=""; //veterinario seleccionado

  isPesoFocused = false; //campo para validacion de peso

  isFrecuenciaCardiacaFocused = false;//para validar campo frec cardiaca

  isSintomasFocused = false;
  validationMessage: string="";

  constructor(private fb: FormBuilder, private datosService: DatosService, 
    private router: Router, private snackBar: MatSnackBar, private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    // Definir el formulario con los campos requeridos
    this.formulario = this.fb.group({
      temperatura:['',[
        Validators.required,
        Validators.pattern(/^\d{1,3}(\.\d{1,2})?$/), // RegEx para 3 enteros y 2 decimales
      ]],
      peso:['', [
        Validators.required,
        Validators.pattern(/^\d{1,3}(\.\d{1,2})?$/), // RegEx para 3 enteros y 2 decimales
      ]],
      frecuenciaCardiaca:['', [Validators.required, Validators.pattern(/^\d+$/)]],
      sintomas: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
      diagnostico: ['', Validators.required],
      examenesRecomendados: ['', Validators.required],
      observaciones: [''],
      nombreVeterinario: ['', Validators.required]
    });

   // this.usuarioRol="Asistente"

     //recupera info login
     this.datosService.currentData.subscribe(data =>{
      console.log("rol elegido: "+data.rolNombre);
      this.usuarioRol = data.rolNombre;
      this.selectedVetName = data.empNombre;
      this.usuCod = data.usuCorreltivo;
      this.codEmp = data.empId
    });

  }

  //carga elementos al inicio del form
  ngOnInit(): void {

    //comentar esta linea despues
    //this.usuarioRol="Veterinario";

    this.cargarVeterinarios();

    console.log("veterinario: "+this.selectedVetName);

    // Después de establecer selectedVetName, seteamos ese valor en el campo "nombreVeterinario"
    this.formulario.patchValue({
      nombreVeterinario: this.selectedVetName
    });



    // Obtener los datos pasados a través de la ruta
    this.route.params.subscribe(params => {
      const data = params['data'];
      //recibe los parametros aqui
     
      if (data) {

        //console.log(data.fecha);
        //data.fecha='';

        console.log("registro seleccionado: " +data);
        const registro = JSON.parse(data); // Parsear el JSON para obtener el objeto

        //guardo id expediente
        this.idExpediente = registro.expId;
        console.log("<---ID EXPEDIENTE: "+this.idExpediente)

       // veterinarioNombre = registro.veterinario;

        //console.log("vet selected: "+veterinarioNombre)
       /*
        registro.fecha='';
        registro.veterinario='';
        registro.hora='';
        */
        //console.log(registro);

        //this.formulario.patchValue(registro); // Rellenar el formulario con los datos

        //this.fillForm(); // Llenar el formulario con los datos


      }
    });


  }


  // Método para manejar el envío del formulario
  enviarFormulario() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);


      
    // Obtenemos los valores del formulario
    const formValues = this.formulario.value;

    // this.datosService.currentData.subscribe(data =>{
    //   console.log("usu correlativo: "+data);
    //   this.codEmp = data
    // });

    // Aquí puedes definir los valores del request
  const request = {
    empId: this.codEmp,
    expId: this.idExpediente,
    conSintomas: formValues.sintomas,
    conDiagnostico: formValues.diagnostico,
    conExamenes: formValues.examenesRecomendados,
    conObservaciones: formValues.observaciones,
    usuCodigo: this.usuCod,  // Aquí puedes poner el código de usuario si es necesario
    conTemperatura: formValues.temperatura,
    conPeso: formValues.peso,
    conFrecardiaca: formValues.frecuenciaCardiaca
  };


  console.log("request enviado: " +JSON.stringify(request));


  //cuadro de confirmacion 
  const dialogRef = this.dialog.open(ConfirmDialogComponent);


  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Lógica para guardar el expediente
      //this.generarCita();

      //se envia peticion post
    this.datosService.agregaraConsultaMedica(request).subscribe({
      next: (response) => {
        console.log('Consulta enviada exitosamente:', response);
        // Aquí puedes manejar la respuesta, como mostrar un mensaje de éxito, redirigir, etc.
        this.openSnackBar("CONSULTA MEDICA GUARDADA CON EXITO.");
        this.router.navigate(['/consultar-expediente']);

      },
      error: (error) => {
        console.error('Error al enviar consulta:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error
        this.openSnackBar("ERROR AL GUARDAR CONSULTA MEDICA.");
      }
    });
  
    } else {
      console.log('Guardado cancelado');
    }
  });

  




    } else {
      console.log('---->Formulario inválido<----');
      this.openSnackBar("POR FAVOR COMPLETAR TODOS LOS CAMPOS OBLIGATORIOS(*).");
    }
  }


  regresar(): void {
    // Ejemplo de redirección a una ruta específica
    this.router.navigate(['/consultar-expediente']); // Cambia '/menu' a la ruta que necesites
  }


  limpiarFormulario(){
    this.formulario.reset(); // Limpia el formulario
  }

  toUpperCase(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.toUpperCase(); // Convierte el texto a mayúsculas
  }


  // //guardar consulta
  // enviarConsulta(): void {

  //   // Obtenemos los valores del formulario
  //   const formValues = this.formulario.value;

  //   // Aquí puedes definir los valores del request
  // const request = {
  //   empId: 1,
  //   expId: 9,
  //   conSintomas: formValues.sintomas,
  //   conDiagnostico: formValues.diagnostico,
  //   conExamenes: formValues.examenesRecomendados,
  //   conObservaciones: formValues.observaciones,
  //   usuCodigo: ''  // Aquí puedes poner el código de usuario si es necesario
  // };


  // console.log("request enviado: " +request);


  //   this.datosService.agregaraConsultaMedica(request).subscribe({
  //     next: (response) => {
  //       console.log('Consulta enviada exitosamente:', response);
  //       // Aquí puedes manejar la respuesta, como mostrar un mensaje de éxito, redirigir, etc.
       
  //     },
  //     error: (error) => {
  //       console.error('Error al enviar consulta:', error);
  //       // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error
  //       this.openSnackBar("ERROR AL GUARDAR CONSULTA MEDICA.");
  //     }
  //   });
  // }

  //mensaje de salida
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 8000, // Duración en milisegundos
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  //carga lista veterinarios
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


  //validacion para campo peso
  get pesoControl() {
    return this.formulario.get('peso');
  }

  // Función para manejar el evento onFocus
  onFocusPeso() {
    this.isPesoFocused = true;
  }

  // Función para manejar el evento onBlur (cuando el input pierde el foco)
  onBlurPeso() {
    this.isPesoFocused = false;
  }
  get tempControl() {
    return this.formulario.get('temperatura');
  }


  //validaciones para campo temperatura
  

  // Validación para permitir solo números decimales con hasta 3 enteros y 2 decimales
  validateDecimalInput(event: KeyboardEvent) {
    const inputValue = event.target as HTMLInputElement;
    const value = inputValue.value;
    const charCode = event.charCode;

    // Permitir solo números, punto decimal y restricciones de 3 enteros y 2 decimales
    const regex = /^\d{0,3}(\.\d{0,2})?$/;

    // Si la tecla presionada no es un número ni un punto, prevenir la entrada
    if (
      (charCode < 48 || charCode > 57) && // No es un número
      charCode !== 46 // No es el punto decimal
    ) {
      event.preventDefault();
      return;
    }

    // Validar si el valor sigue el patrón deseado
    if (!regex.test(value + String.fromCharCode(charCode))) {
      event.preventDefault(); // Si el valor excede el formato permitido, prevenir la entrada
    }
  }

  //para frecuencia cardiaca
  get frecuenciaCardiacaControl() {
    return this.formulario.get('frecuenciaCardiaca');
  }

  // Función para manejar el evento onFocus
  onFocusFrecuenciaCardiaca() {
    this.isFrecuenciaCardiacaFocused = true;
  }

  // Función para manejar el evento onBlur (cuando el input pierde el foco)
  onBlurFrecuenciaCardiaca() {
    this.isFrecuenciaCardiacaFocused = false;
  }

  // Validación para permitir solo números enteros
  validateIntegerInput(event: KeyboardEvent) {
    const charCode = event.charCode;

    // Permitir solo números (códigos ASCII 48-57 para números 0-9)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault(); // Si el carácter no es un número, se previene la entrada
    }
  }

  // Getter genérico para obtener el control del formulario
  getControl(controlName: string) {
    return this.formulario.get(controlName);
  }

 // Función genérica para verificar si el control está inválido y tocado
isControlInvalid(controlName: string): boolean {
  const control = this.getControl(controlName);
  return control ? control.invalid && control.touched : false;
}

  // Función genérica para manejar el evento onFocus
  onFocus(validationType: string) {
    this.isSintomasFocused = true;

    // Dependiendo del tipo de validación, mostramos un mensaje apropiado
    switch (validationType) {
      case 'alfanumerico':
        this.validationMessage = 'Solo se permiten caracteres alfanuméricos (letras y números).';
        break;
      case 'numerico':
        this.validationMessage = 'Solo se permiten números.';
        break;
      case 'texto':
        this.validationMessage = 'Solo se permiten letras.';
        break;
      default:
        this.validationMessage = '';
        break;
    }
  }

  // Función genérica para manejar el evento keypress
  validateInput(event: KeyboardEvent, validationType: string) {
    const charCode = event.charCode;

    // Validación dependiendo del tipo de entrada
    switch (validationType) {
      case 'alfanumerico':
        // Permitir letras (A-Z, a-z), números (0-9) y espacios
        if (
          (charCode < 48 || charCode > 57) &&  // No es un número (0-9)
          (charCode < 65 || charCode > 90) &&  // No es una letra mayúscula (A-Z)
          (charCode < 97 || charCode > 122) && // No es una letra minúscula (a-z)
          charCode !== 32                    // No es un espacio
        ) {
          event.preventDefault(); // Si no es alfanumérico o espacio, prevenir la entrada
        }
        break;

      case 'numerico':
        // Permitir solo números
        if (charCode < 48 || charCode > 57) {
          event.preventDefault(); // Si no es un número, prevenir la entrada
        }
        break;

      case 'texto':
        // Permitir solo letras (A-Z, a-z)
        if (
          (charCode < 65 || charCode > 90) &&  // No es una letra mayúscula
          (charCode < 97 || charCode > 122)    // No es una letra minúscula
        ) {
          event.preventDefault(); // Si no es una letra, prevenir la entrada
        }
        break;

      default:
        break;
    }
  }


}
