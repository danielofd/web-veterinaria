import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosService } from '../service/datos.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-consulta-medica',
  templateUrl: './agregar-consulta-medica.component.html',
  styleUrls: ['./agregar-consulta-medica.component.css']
})
export class AgregarConsultaMedicaComponent {

  formulario: FormGroup;

  constructor(private fb: FormBuilder, private datosService: DatosService, private router: Router, private snackBar: MatSnackBar) {
    // Definir el formulario con los campos requeridos
    this.formulario = this.fb.group({
      sintomas: ['', Validators.required],
      diagnostico: ['', Validators.required],
      examenesRecomendados: ['', Validators.required],
      observaciones: ['', Validators.required],
      nombreVeterinario: ['', Validators.required]
    });
  }

  // Método para manejar el envío del formulario
  enviarFormulario() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
    } else {
      console.log('Formulario inválido');
    }
  }


  regresar(): void {
    // Ejemplo de redirección a una ruta específica
    this.router.navigate(['/consultar-historial-medico']); // Cambia '/menu' a la ruta que necesites
  }


  limpiarFormulario(){
    this.formulario.reset(); // Limpia el formulario
  }

  toUpperCase(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.toUpperCase(); // Convierte el texto a mayúsculas
  }

}
