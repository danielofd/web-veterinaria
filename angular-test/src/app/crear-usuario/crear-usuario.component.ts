import { Component, OnInit } from '@angular/core';
import { DatosService } from '../service/datos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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

  isPasswordVisible: boolean = false;

  // Datos de ejemplo para empleados y roles
  //para empleados
  empleados :any[] =[];
  selectedEmpleadoId: number | null = null;
  //para roles
  roles: any[] = [];
  selectedRolId: number | null = null;


  // Crear el formulario reactivo
  form: FormGroup;
  

  constructor(
    private datosService: DatosService,
    private fb: FormBuilder
  ) {
     // Inicializar el formulario con validaciones
      this.form = this.fb.group({
        empleado: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]], // El correo solo necesita 'required' y 'email'
        rol: ['', Validators.required],
        contrasena: ['', 
          [
            Validators.required, 
            Validators.minLength(12),
            Validators.pattern(/[A-Z]/), // Al menos una letra mayúscula
            Validators.pattern(/[0-9]/), // Al menos un número
            Validators.pattern(/[@$!%*?&]/) // Al menos un carácter especial
          ]
        ] // Validación de longitud mínima para la contraseña
      });
  }

  ngOnInit(): void {

    //obtener empleados
    this.obtenerEmpleados();
    this.obtenerRoles();
    
  }
  //ocultar password
  togglePasswordVisibility(event: KeyboardEvent): void {
    // Si la tecla presionada es "Enter" (código de tecla 13), alternamos la visibilidad
    if (event.key === 'Enter') {
      this.isPasswordVisible = !this.isPasswordVisible;
    }
  }

   // Método para alternar la visibilidad de la contraseña
   togglePassword(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }


  //get empleados
  obtenerEmpleados(): void {
    this.datosService.getEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
        console.log("---recupera todos los empleados: "+JSON.stringify(data));
      },
      error: (err) => {
        console.error('Error al obtener empleados:', err);
      }
    });
  }

  //get roles
  obtenerRoles(): void {
    this.datosService.getRoles().subscribe({
      next: (data) => {
        this.roles = data;
        console.log("---recupera todos los roles: "+JSON.stringify(data));
      },
      error: (err) => {
        console.error('Error al obtener roles:', err);
      }
    });
  }

  //guardar nuevo usuario
  guardarUsuario(): void {
    if (this.form.valid) {
      console.log('Formulario Enviado:', this.form.value);
    } else {
      this.form.markAllAsTouched();
      console.log('Formulario Inválido');
    }
  }

  // Función para limpiar los campos del formulario
  limpiar(): void {
    this.form.reset(); // Resetea todos los campos del formulario
  }


}
