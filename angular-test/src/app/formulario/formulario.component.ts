import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importa Router si deseas hacer navegación

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  tipoAnimal: string[] = ['Felino', 'Canino'];
  razaAnimal: string[] = [];

  razaGato: string[] = ['Gato Persa', 'Gato Siamés', 'Gato Maine Coon', 'Gato Bengalí', 'Gato Sphynx'];
  razaPerro: string[] = ['Labrador', 'Pastor Alemán', 'Bulldog', 'Golden Retriever', 'Beagle'];

  formularioRegistro: FormGroup

  constructor(private form: FormBuilder, private router: Router) {
    this.formularioRegistro = this.form.group({
      name: ['', Validators.required],
      owner: ['', Validators.required],
      animal: [''],
      gender: ['', Validators.required],
      raza: [''],
      color: ['', Validators.required],
      weight: ['', Validators.required],
      temp: ['', Validators.required],
      frec: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      med: [''],
      date: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.formularioRegistro.get('animal')?.valueChanges.subscribe(value => {

      if (value === 'Felino') {
        this.razaAnimal = this.razaGato;
      } else if (value === 'Canino') {
        this.razaAnimal = this.razaPerro;
      }

    })
  }

  enviar() {
    console.log(this.formularioRegistro);
  }

   // Método para regresar al menú o a la página anterior
   regresar(): void {
    // Ejemplo de redirección a una ruta específica
    this.router.navigate(['/home']); // Cambia '/menu' a la ruta que necesites
  }

  // Método para guardar el expediente
  guardarExpediente(): void {
    if (this.formularioRegistro.valid) {
      // Lógica para guardar el expediente
      console.log('Expediente guardado:', this.formularioRegistro.value);
    } else {
      // Manejar el caso de formulario inválido
      console.log('Formulario inválido');
    }
  }

  limpiar(): void {
    this.formularioRegistro.reset(); // Limpia el formulario
  }

  hasErrors(controlName: string, errorType: string) {
    return this.formularioRegistro.get(controlName)?.hasError(errorType) && this.formularioRegistro.get(controlName)?.touched
  }

}
