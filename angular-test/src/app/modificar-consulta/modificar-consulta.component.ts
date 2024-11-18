import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConsultaService } from '../consulta.service';

@Component({
  selector: 'app-modificar-consulta',
  templateUrl: './modificar-consulta.component.html',
  styleUrls: ['./modificar-consulta.component.css']
})
export class ModificarConsultaComponent implements OnInit {

  consulta: any; // Consulta a modificar

  @Output() close: EventEmitter<void> = new EventEmitter<void>(); // Evento para cerrar el modal
  @Output() save: EventEmitter<any> = new EventEmitter<any>(); // Evento para guardar la consulta modificada

  constructor(private consultaService: ConsultaService) {}

  ngOnInit() {
    // Obtener la consulta desde el servicio
    this.consulta = this.consultaService.getConsulta();
    console.log("Consulta recibida en el modal:", this.consulta);
  }

  // Método para cerrar el modal
  closeModal() {

    //this.consultaService.setConsulta(this.consulta);

    this.close.emit();
  }

  // Método para guardar la consulta modificada
  saveConsulta() {


    this.save.emit(this.consulta); // Emitimos la consulta modificada

    //this.consultaService.setConsulta(this.consulta);

    this.closeModal(); // Cerramos el modal
  }

  
}
