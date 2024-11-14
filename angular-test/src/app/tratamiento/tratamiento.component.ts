import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalServiceService } from '../modal-service.service';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css']
})
export class TratamientoComponent{
  @Output() close = new EventEmitter<void>();
  tratamiento: { descripcion: string } = { descripcion: '' };


  // Lista de tratamientos que el usuario puede agregar
  tratamientos: Array<any> = [{
    medicamento: '',
    dosis: '',
    frecuencia: '',
    duracion: '',
    fechaInicio: '',
    fechaCreacion: new Date().toISOString().split('T')[0], // Fecha actual como valor predeterminado
  }];

  // Método para agregar una nueva fila
  agregarFila() {
    this.tratamientos.push({
      medicamento: '',
      dosis: '',
      frecuencia: '',
      duracion: '',
      fechaInicio: '',
      fechaCreacion: new Date().toISOString().split('T')[0], // Fecha actual como valor predeterminado
    });
  }

  // Método para eliminar una fila
  eliminarFila(index: number) {
    if (this.tratamientos.length > 1) {
      this.tratamientos.splice(index, 1);
    }
  }

  // Método para cerrar el modal
  closeTratamientoModal() {
    this.close.emit(); // Emitir evento de cierre al componente principal
  }

  // Método para guardar el tratamiento (puedes agregar más lógica aquí)
  guardarTratamiento() {
    // Lógica para guardar el tratamiento
    //console.log('Tratamiento guardado:', this.tratamiento.descripcion);

    console.log(this.tratamientos);

    this.closeTratamientoModal(); // Cerrar el modal después de guardar
  }



  
}
