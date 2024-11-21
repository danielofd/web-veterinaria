import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit  {

    // Variables para el formulario
  empleado: string = '';
  correo: string = '';
  rol: string = '';
  contrasena: string = '';
  estado: string = '';

  // Datos de ejemplo para empleados y roles
  empleados = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'María Gómez' },
    { id: 3, nombre: 'Carlos Fernández' }
  ];

  roles = [
    { id: 'admin', nombre: 'Administrador' },
    { id: 'user', nombre: 'Usuario' }
  ];

  constructor() {}

  ngOnInit(): void {

    
    
  }

}
