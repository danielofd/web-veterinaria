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

    //fecha quemada
    //const fecha='2024-10-08';

    console.log("fecha => "+cod);
    console.log("hora => "+mascota);
    console.log("propietario => "+propietario);
    
      this.datosService.buscarExpediente(cod,mascota,propietario).subscribe(
        (data) => {
          console.log('Datos recibidos:', data); // Para depuración
          this.registros = data; // Asignar los datos a registros
          this.formulario.reset(); // Reiniciar el formulario
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

}
