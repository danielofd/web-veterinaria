import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosService } from '../service/datos.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consultar-cita',
  templateUrl: './consultar-cita.component.html',
  styleUrls: ['./consultar-cita.component.css']
})
export class ConsultarCitaComponent {

  formulario: FormGroup;

  registros: any[] = []; // Arreglo para almacenar los registros

  constructor(private fb: FormBuilder, private datosService: DatosService, private router: Router, private snackBar: MatSnackBar) {
    this.formulario = this.fb.group({
      fecha: ['', Validators.required],
      hora: [''],
      nombrePropietario: ['']
    });
  }

 
  consultarCita() {
    console.log('probando consulta...');

    //valida campos obligatorios antes de guardar
  if (this.formulario.get('fecha')?.invalid) {
    // Aquí puedes mostrar un mensaje o hacer algo en caso de que el formulario sea inválido
    this.procesoMsg('POR FAVOR COMPLETAR TODOS LOS CAMPOS OBLIGATORIOS(*).');
    return; // Evita continuar si el formulario no es válido
}


    const fecha = this.formulario.value.fecha; // Obtener la fecha del formulario

    const hora = this.formulario.value.hora;

    const propietario = this.formulario.value.nombrePropietario;

    //fecha quemada
    //const fecha='2024-10-08';

    console.log("fecha => "+fecha);
    console.log("hora => "+hora);
    console.log("propietario => "+propietario);
    
      this.datosService.buscarCita(fecha,hora,propietario).subscribe(
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
    this.router.navigate(['/menu-citas']); // Cambia '/menu' a la ruta que necesites
  }


  editarRegistro(index: number) {
    const registro = this.registros[index];
    console.log(registro);
    this.formulario.patchValue(registro); // Cargar los valores en el formulario
    //this.registros.splice(index, 1); // Eliminar el registro del array

    //redirige al componente modificar cita
    this.router.navigate(['/modificar-cita', { data: JSON.stringify(registro) }]);


  }

  eliminarRegistro(index: number) {
    //this.registros.splice(index, 1); // Eliminar el registro del array
  }

  procesoMsg(msj: string) {
    const snackBarRef = this.snackBar.open(msj, 'Cerrar', {
      duration: 20000,
      panelClass: ['snackbar-confirm'],
    });
  
  
  }

}
