import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosService } from '../service/datos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalServiceService } from '../modal-service.service';
import { ConsultaService } from '../consulta.service';

declare var bootstrap: any;  // Esto es necesario para que TypeScript reconozca 'bootstrap'

@Component({
  selector: 'app-ver-historial-medico',
  templateUrl: './ver-historial-medico.component.html',
  styleUrls: ['./ver-historial-medico.component.css']
})
export class VerHistorialMedicoComponent implements OnInit {

  isDisabled: boolean=true; //para deshabilitar boton

  consultaForm: FormGroup;
  consultas: any[] = [];

  isModalOpen: boolean = false; // Estado del modal
  selectedConsulta: any; // Consulta seleccionada para mostrar en el modal

  isLoading = true; // Inicialmente está en true mientras cargan los datos

  //selectedConsulta2: any = null;
  isConsultaModalOpen = false;

  registroExp: any;

  isTratamientoModalOpen: boolean = false;  // Estado del modal de tratamiento

  isModificarModalOpen = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private datosService: DatosService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private consultaService: ConsultaService,
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

      if(consulta){
        this.selectedConsulta = consulta;
        console.log("consulta modal selected:" +JSON.stringify(consulta))
        this.consultaService.setConsulta(consulta); // Actualizamos el servicio con la consulta seleccionada
      }

    // this.selectedConsulta = consulta;

    // console.log("consulta modal selected:" +JSON.stringify(consulta))
    //this.selectedConsulta=consulta;

    //console.log("consulta selected 2: "+JSON.stringify(this.selectedConsulta2))

    
    this.isConsultaModalOpen = true;
  }

  // Cierra el modal
  closeConsultaModal(): void {
    this.isConsultaModalOpen = false;
    //this.selectedConsulta = null;
  }

  // Acciones para los botones en consulta-card
  modifyConsulta(consulta: any): void {
      

            //const registro = this.registros[index];
            console.log(consulta);
            this.consultaForm.patchValue(consulta); // Cargar los valores en el formulario
            //this.registros.splice(index, 1); // Eliminar el registro del array


              // Cerrar el modal antes de redirigir
              // const modalElement = document.getElementById('isConsultaModalOpen');
              // const modal = bootstrap.Modal.getInstance(modalElement!);  // Obtener la instancia del modal
              // modal.hide();  // Cerrar el modal

              // console.log("Entra a metodo agregar consulta"+modal)


            //redirige al componente modificar cita
            // this.router.navigate(['agregar-consulta-medica', { data: JSON.stringify(consulta) }]);
              
              // Lógica para modificar la consulta
              // console.log('Modificar consulta', consulta);
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



  //para agregar consulta medica
agregarConsulta(registro: any) {
  //const registro = this.registros[index];
  console.log(registro);
  this.consultaForm.patchValue(registro); // Cargar los valores en el formulario
  //this.registros.splice(index, 1); // Eliminar el registro del array


    // Cerrar el modal antes de redirigir
    const modalElement = document.getElementById('isConsultaModalOpen');
    const modal = bootstrap.Modal.getInstance(modalElement!);  // Obtener la instancia del modal
    modal.hide();  // Cerrar el modal

    console.log("Entra a metodo agregar consulta"+modal)


  //redirige al componente modificar cita
  this.router.navigate(['agregar-consulta-medica', { data: JSON.stringify(registro) }]);

}

// Método para abrir el modal de modificar consulta
openModificarModal(consulta: any) {

  if(consulta){
    //this.selectedConsulta = consulta; // Solo asigna si consulta es válido
    this.selectedConsulta = consulta; // Pasar la consulta seleccionada al modal

    console.log("---almacena el obj consulta---");

    console.log(this.consultaService.getConsulta());


    console.log("---almacena el obj consulta---");
  

    this.consultaService.setConsulta(consulta); // Actualizamos el servicio con la consulta seleccionada
  }

  //this.consultaService.setConsulta(this.selectedConsulta); // Actualizamos el servicio con la consulta seleccionada

  //console.log("---almacena el obj consulta---");
  //this.selectedConsulta=consulta;

  //console.log("datos de consulta: "+consulta)

  //console.log("datos de selectedConsulta: "+this.selectedConsulta)

  // console.log(this.consultaService.getConsulta());


  // console.log("---almacena el obj consulta---");

  //console.log("datos de selectedConsulta: "+this.selectedConsulta)

   // Usamos el servicio para almacenar la consulta
   //this.consultaService.setConsulta(consulta);

  //this.selectedConsulta = { ...consulta }; // Creamos una copia para modificarla
  this.isModificarModalOpen = true;

  

  // Navega al componente de modificación
  //this.router.navigate(['/modificar-consulta']);
}


// Método para cerrar el modal de modificar consulta
closeModificarModal() {
  this.isModificarModalOpen = false;
  //this.selectedConsulta = null;
}

// Método para guardar la consulta modificada
guardarConsulta(modifiedConsulta: any) {
  console.log("Consulta modificada:", modifiedConsulta);
  // Aquí puedes agregar lógica para guardar los cambios (por ejemplo, hacer un API call)
  // Actualizar el historial de consultas o similar
  this.closeModificarModal(); // Cerrar el modal después de guardar
}

// Método para guardar la consulta modificada
// saveModifiedConsulta(consulta: any) {
//   const index = this.consultas.findIndex(c => c.conFecConsulta === consulta.conFecConsulta);
//   if (index !== -1) {
//     this.consultas[index] = consulta; // Actualizamos la consulta en el array
//   }
// }

}

