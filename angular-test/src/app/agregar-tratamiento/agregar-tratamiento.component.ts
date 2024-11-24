import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DatosService } from '../service/datos.service';
import { GlobalService } from '../global.service';
import { ConsultaService } from '../consulta.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-tratamiento',
  templateUrl: './agregar-tratamiento.component.html',
  styleUrls: ['./agregar-tratamiento.component.css']
})




export class AgregarTratamientoComponent implements OnInit{

  tratamiento: { descripcion: string } = { descripcion: '' };

  tratamientoForm: FormGroup;

  consulta: any;
  usuCodigo: any;

  constructor(private fb: FormBuilder,
    private datosService: DatosService,
    private globalService: GlobalService,
    private consultaService: ConsultaService,
    private snackBar: MatSnackBar,
  ) { 
    // Inicializar el formulario
    this.tratamientoForm = this.fb.group({
      tratamientos: this.fb.array([ // Un array para manejar múltiples tratamientos
        this.createTratamiento()
      ])
    });

    //recuperamos el idCon
    this.globalService.currentData.subscribe(data =>{
      console.log("data: "+data);
       this.consulta=data;
    });
  }


  ngOnInit(): void {
    // // Inicializar el formulario
    // this.tratamientoForm = this.fb.group({
    //   tratamientos: this.fb.array([ // Un array para manejar múltiples tratamientos
    //     this.createTratamiento()
    //   ])
    // });
  }

  // Método para crear un nuevo grupo de tratamiento
  createTratamiento(): FormGroup {
    return this.fb.group({
      trtMedicamento: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],  // Alfanumérico + espacio
      trtDosis: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      trtFrecuencia: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      trtDuracion: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      trtFecInicio: ['', Validators.required]
    });
  }


  // Lista de tratamientos que el usuario puede agregar
  // tratamientos: Array<any> = [{
  //   medicamento: '',
  //   dosis: '',
  //   frecuencia: '',
  //   duracion: '',
  //   fechaInicio: '',
  //   fechaCreacion: new Date().toISOString().split('T')[0], // Fecha actual como valor predeterminado
  // }];

  // Método para agregar una nueva fila
  // agregarFila() {
  //   this.tratamientos.push({
  //     medicamento: '',
  //     dosis: '',
  //     frecuencia: '',
  //     duracion: '',
  //     fechaInicio: '',
  //     fechaCreacion: new Date().toISOString().split('T')[0], // Fecha actual como valor predeterminado
  //   });
  // }

  // Método para eliminar una fila
  // eliminarFila(index: number) {
  //   if (this.tratamientos.length > 1) {
  //     this.tratamientos.splice(index, 1);
  //   }
  // }

  // Método para cerrar el modal
  // closeTratamientoModal() {
    //this.close.emit(); // Emitir evento de cierre al componente principal
  // }

  // Método para guardar el tratamiento (puedes agregar más lógica aquí)
  // guardarTratamiento() {
    // Lógica para guardar el tratamiento
    //console.log('Tratamiento guardado:', this.tratamiento.descripcion);

  //   console.log(this.tratamientos);

  //   this.closeTratamientoModal(); // Cerrar el modal después de guardar
  // }

  // Obtener el array de tratamientos como FormArray
  get tratamientos(): FormArray {
    return this.tratamientoForm.get('tratamientos') as FormArray;
  }

  // Agregar una nueva fila de tratamiento
  agregarFila() {
    //this.tratamientos.push(this.createTratamiento());
    // Validar que el número de filas no supere 5
  if (this.tratamientos.length < 6) {
    this.tratamientos.push(this.createTratamiento());
  } else {
    this.procesoMsg("SOLO SE PERMITE AÑADIR 6 MEDICAMENTOS MAXIMO.");
  }
  }

  // Método para quitar la última fila de tratamiento
quitarFila() {
  const index = this.tratamientos.length - 1; // Obtener el índice de la última fila
  if (index >= 0) { // Solo eliminar si hay al menos una fila
    this.tratamientos.removeAt(index); // Eliminar la última fila
  }
}


  // Enviar el formulario
  onSubmit() {
    if (this.tratamientoForm.valid) {
      console.log('Formulario enviado:', this.tratamientoForm.value);

      const conId = this.consultaService.getConsulta();

      const requestBody: RequestBody = {
        conId: conId.conId,
        usuCodigo: "1",  // Aquí usas el valor del usuario
        tratamientoDetalle: this.tratamientos.value // Obtener los valores del formulario
      };

      //ver request
      console.log("--------req tratamiento-----------");
        console.log(requestBody);
      console.log("----------------------------------");

      //comentar return
      //return;
      // Llamamos al servicio para hacer el POST
      this.datosService.agregarTratamiento(requestBody).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          //alert(response.postResponse); // Mostrar respuesta del servidor
          this.procesoMsg(response.postResponse);
        },
        error: (error) => {
          console.error('Error al enviar los datos:', error);
          alert('Hubo un error al guardar el tratamiento.');
          this.procesoMsg("ERROR AL GUARDAR REGISTRO.");
        }
      });
    }  
    else {
      console.log('Formulario inválido');
      this.procesoMsg("POR FAVOR COMPLETAR TODOS LOS CAMPOS OBLIGATORIOS(*).");
    }
  }

  regresar(){
    console.log("<= regresando a form historial medico...");
  }

  // Método para validar solo caracteres alfanuméricos y espacio en blanco
  validarAlfanumerico(event: KeyboardEvent) {
    const regex = /^[a-zA-Z0-9 ]$/; // Alfanumérico y espacio en blanco
    const tecla = String.fromCharCode(event.charCode); // Obtener el carácter de la tecla presionada

    if (!regex.test(tecla)) {
      event.preventDefault(); // Si no coincide con la expresión regular, evitar la tecla
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


}


// Define las interfaces para los datos que vas a enviar y recibir
export interface Tratamiento {
  trtMedicamento: string;
  trtDosis: string;
  trtFrecuencia: string;
  trtDuracion: string;
  trtFecInicio: string;
}

export interface RequestBody {
  conId: number;
  usuCodigo: string;
  tratamientoDetalle: Tratamiento[];
}