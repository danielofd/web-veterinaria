import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importa Router si deseas hacer navegación
import { DatosService } from '../service/datos.service';
import { TipoMascota } from 'src/models/tipo-mascota';
import { Raza } from 'src/models/raza';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  tiposMascotas: TipoMascota[] = [];
  selectedTipoMascota: number |null=null;

  //razas: Raza[]=[];
  //selectedRaza: number |null=null;

  mensaje: string = '';

  //tipoAnimal: string[] = ['Felino', 'Canino'];
  //razaAnimal: string[] = [];

  //razaGato: string[] = ['Gato Persa', 'Gato Siamés', 'Gato Maine Coon', 'Gato Bengalí', 'Gato Sphynx'];
  //razaPerro: string[] = ['Labrador', 'Pastor Alemán', 'Bulldog', 'Golden Retriever', 'Beagle'];

  formularioRegistro: FormGroup

  constructor(private form: FormBuilder, private router: Router, private datosService: DatosService) {
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

  
  /**
  cargarTipoMascotas():void{
    this.datosService.getTipoMascotas().subscribe(
      (response) =>{
      
        this.tiposMascotas = response;

        const existeFelino = this.tiposMascotas.some(tipo => tipo.timGrupo === 'FELINO');
        if (existeFelino) {
          this.mensaje = 'La clase FELINO está disponible.';
          console.log(existeFelino)
        } else {
          this.mensaje = 'La clase FELINO no está disponible.';
        }
        
      },
      (error)=>{
        console.error('Error al cargar los tipos de mascotas', error);
      }
    );
  }
  */
  cargarTipoMascotas()  {
    this.datosService.getTipoMascotas().pipe(
      tap(response => {
        this.tiposMascotas = response;
        const existeFelino = this.tiposMascotas.some(tipo => tipo.timGrupo === 'FELINO');
        this.mensaje = existeFelino 
          ? 'La clase FELINO está disponible.' 
          : 'La clase FELINO no está disponible.';
        console.log(existeFelino);
      }),
      catchError(error => {
        console.error('Error al cargar los tipos de mascotas', error);
        // Puedes devolver un valor por defecto o manejar el error de otra manera
        return of([]); // Devuelve un array vacío en caso de error
      })
    ).subscribe();
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
    //this.razaAnimal=[];
  }

  hasErrors(controlName: string, errorType: string) {
    return this.formularioRegistro.get(controlName)?.hasError(errorType) && this.formularioRegistro.get(controlName)?.touched
  }

}
