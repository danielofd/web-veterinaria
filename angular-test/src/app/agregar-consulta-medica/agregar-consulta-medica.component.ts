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

  constructor(private fb: FormBuilder, private datosService: DatosService, 
    private router: Router, private snackBar: MatSnackBar, private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    // Definir el formulario con los campos requeridos
    this.formulario = this.fb.group({
      temperatura:[''],
      peso:[''],
      frecuenciaCardiaca:[''],
      sintomas: ['', Validators.required],
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
    usuCodigo: this.usuCod  // Aquí puedes poner el código de usuario si es necesario
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


}
