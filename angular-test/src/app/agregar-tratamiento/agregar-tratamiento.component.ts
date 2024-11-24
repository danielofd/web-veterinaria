import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-agregar-tratamiento',
  templateUrl: './agregar-tratamiento.component.html',
  styleUrls: ['./agregar-tratamiento.component.css']
})
export class AgregarTratamientoComponent implements OnInit{

  tratamiento: { descripcion: string } = { descripcion: '' };

  tratamientoForm: FormGroup;

  constructor(private fb: FormBuilder) { 
    // Inicializar el formulario
    this.tratamientoForm = this.fb.group({
      tratamientos: this.fb.array([ // Un array para manejar múltiples tratamientos
        this.createTratamiento()
      ])
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
      medicamento: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],  // Alfanumérico + espacio
      dosis: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      frecuencia: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      duracion: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      fechaInicio: ['', Validators.required]
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
    this.tratamientos.push(this.createTratamiento());
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
    } else {
      console.log('Formulario inválido');
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


}
