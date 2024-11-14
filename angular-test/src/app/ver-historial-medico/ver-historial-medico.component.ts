import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosService } from '../service/datos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalServiceService } from '../modal-service.service';

@Component({
  selector: 'app-ver-historial-medico',
  templateUrl: './ver-historial-medico.component.html',
  styleUrls: ['./ver-historial-medico.component.css']
})
export class VerHistorialMedicoComponent implements OnInit {

  consultaForm: FormGroup;
  consultas: any[] = [];

  isModalOpen: boolean = false; // Estado del modal
  selectedConsulta: any; // Consulta seleccionada para mostrar en el modal

  isLoading = true; // Inicialmente está en true mientras cargan los datos

  selectedConsulta2: any = null;
  isConsultaModalOpen = false;

  registroExp: any;

  isTratamientoModalOpen: boolean = false;  // Estado del modal de tratamiento

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private datosService: DatosService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private modalService: ModalServiceService
    //private consultaService: ConsultaService
  ) {
    this.consultaForm = this.fb.group({
      conFecConsulta: [''],
      conSintomas: [''],
      conDiagnostico: [''],
      conExamenes: [''],
      conObservaciones: [''],
      empNombre: [''],
    });

  }

  //  // Función para abrir el modal de tratamiento
  //  openTratamientoModal(): void {
  //   this.modalService.openModal();  // Llamamos al servicio para abrir el modal
  // }


  ngOnInit(): void {

   

     // Obtener los datos pasados a través de la ruta
     this.route.params.subscribe(params => {
      const data = params['data'];
      //recibe los parametros aqui
     
      if (data) {

        //console.log(data.fecha);
        //data.fecha='';

        console.log("registro seleccionado: " +data);
        const registro = JSON.parse(data); // Parsear el JSON para obtener el objeto
        
        this.registroExp=registro;

        console.log("---ver registro---");
        console.log( this.registroExp);

        this.loadConsultas(registro.expId);

        

        //guardo id expediente
        //this.idExpediente = registro.expId;
        //console.log("<---ID EXPEDIENTE: "+this.idExpediente)

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

  
  // openConsultaModal(consulta: any): void {
  //   this.selectedConsulta2 = consulta;
  //   this.isConsultaModalOpen = true;
  // }

  // closeConsultaModal(): void {
  //   this.isConsultaModalOpen = false;
  //   this.selectedConsulta2 = null;
  // }


  // Método para cargar las consultas, acepta empId como parámetro
  loadConsultas(empId: number): void {
    this.datosService.buscarHistorialMedico(empId).subscribe(
      (data) => {
        console.log("---respuesta recibida: "+data)
        this.consultas = data;  // Asignamos la respuesta del GET a la variable consultas
        this.isLoading = false;  // Activamos el estado de carga
      },
      (error) => {
        console.error('Error al cargar las consultas:', error);
        this.isLoading = false;  // Activamos el estado de carga
      }
    );

   
  }

  onSelectConsulta(consulta: any): void {
    this.consultaForm.patchValue({
      conFecConsulta: consulta.conFecConsulta,
      conSintomas: consulta.conSintomas,
      conDiagnostico: consulta.conDiagnostico,
      conExamenes: consulta.conExamenes,
      conObservaciones: consulta.conObservaciones,
      empNombre: consulta.empNombre,
    });
  }


  // Método para llenar el formulario con los detalles de la consulta seleccionada
  // verDetalles(consulta: any): void {
  //   // Llenamos el formulario con los datos de la consulta seleccionada
  //   this.consultaForm.patchValue({
  //     conFecConsulta: consulta.conFecConsulta,
  //     conSintomas: consulta.conSintomas,
  //     conDiagnostico: consulta.conDiagnostico,
  //     conExamenes: consulta.conExamenes,
  //     conObservaciones: consulta.conObservaciones,
  //     empNombre: consulta.empNombre,
  //   });

  //   // Aquí podrías agregar cualquier lógica adicional para mostrar detalles extra si lo deseas
  //   console.log('Detalles completos de la consulta:', consulta);
  // }


  // Método para abrir el modal y mostrar los detalles de la consulta seleccionada
  verDetalles(consulta: any): void {
    this.selectedConsulta = consulta;  // Guardamos la consulta seleccionada
    this.isModalOpen = true;  // Abrimos el modal
  }

  // Método para cerrar el modal
  closeModal(): void {
    this.isModalOpen = false;  // Cerramos el modal
  }
  
  regresar(): void {
    // Ejemplo de redirección a una ruta específica
    this.router.navigate(['/consultar-expediente']); // Cambia '/menu' a la ruta que necesites
  }

  procesoMsg(msj: string) {
    const snackBarRef = this.snackBar.open(msj, 'Cerrar', {
      duration: 20000,
      panelClass: ['snackbar-confirm'],
      verticalPosition: 'top',
    });
  
  
  }

  modificarConsulta(){
      console.log("presiono modificar consulta medica....");
  }


  // Abre el modal al hacer clic en la tarjeta de consulta
  openConsultaModal(consulta: any): void {
    this.selectedConsulta = consulta;
    this.isConsultaModalOpen = true;
  }

  // Cierra el modal
  closeConsultaModal(): void {
    this.isConsultaModalOpen = false;
    this.selectedConsulta = null;
  }

  // Acciones para los botones en consulta-card
  modifyConsulta(consulta: any): void {

    
    // Lógica para modificar la consulta
    console.log('Modificar consulta', consulta);
    // Aquí puedes agregar la lógica para modificar la consulta (p.ej., abrir otro modal)
  }

  addExamenes(consulta: any): void {
    // Lógica para agregar exámenes
    console.log('Agregar exámenes a', consulta);
    // Aquí puedes agregar la lógica para agregar exámenes (p.ej., abrir un formulario para agregar exámenes)
  }

  addTratamiento(consulta: any): void {
    // Lógica para agregar tratamiento
    console.log('Agregar tratamiento a', consulta);
    // Aquí puedes agregar la lógica para agregar tratamiento (p.ej., abrir un formulario para agregar tratamiento)
  }

  // Abrir el modal de tratamiento
  openTratamientoModal() {
    this.isTratamientoModalOpen = true;
  }

  // Cerrar el modal de tratamiento
  closeTratamientoModal() {
    this.isTratamientoModalOpen = false;
  }

}
