import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modificar-consulta',
  templateUrl: './modificar-consulta.component.html',
  styleUrls: ['./modificar-consulta.component.css']
})
export class ModificarConsultaComponent {

  @Input() consulta: any; // Consulta a modificar
  @Output() close: EventEmitter<void> = new EventEmitter<void>(); // Evento para cerrar el modal
  @Output() save: EventEmitter<any> = new EventEmitter<any>(); // Evento para guardar la consulta modificada

  // Método para cerrar el modal
  closeModal() {
    this.close.emit();
  }

  // Método para guardar la consulta modificada
  saveConsulta() {
    this.save.emit(this.consulta); // Emitimos la consulta modificada
    this.closeModal(); // Cerramos el modal
  }

}
