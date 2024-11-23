import { Component, OnInit } from '@angular/core';
import { DatosService } from '../service/datos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit  {

  isSubmitting: boolean = false;

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

  //guarda datos de login
  empId: number | null = null;
  usuCod: string ="";

  // Crear el formulario reactivo
  form: FormGroup;
  

  constructor(
    private datosService: DatosService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
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

      const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Lógica para guardar el expediente
        this.ejecutarGuardado(this.form);
      
      
      } else {
        console.log('Guardado cancelado');
      }
    });


      

    } else {
      this.form.markAllAsTouched();
      console.log('Formulario Inválido');
    }
  }
  
  ejecutarGuardado(form: FormGroup<any>) {

    // Extraer los valores del formulario
    const formValues = this.form.value;


    this.datosService.currentData.subscribe(data =>{
      console.log("usu correlativo: "+data.usuCorreltivo);
      this.usuCod = data.usuCorreltivo;
      this.empId = data.empId;
    });
    
    // Crea el objeto con los datos a enviar
    const nuevoUsuario = {
      "usuEmail": formValues.correo, 
      "usuPassword": formValues.contrasena,
      "usuEstado": 1,
      "empId": formValues.empleado,
      "arcId": null,
      "rolId": formValues.rol,  
      "usuCodigo": this.usuCod
    };

    console.log("---Datos a enviar: "+JSON.stringify(nuevoUsuario));

    //comentar return 
    //return;


    this.isSubmitting = true; //se deshabilita boton guardar

        // Llama al servicio para crear el usuario
    this.datosService.crearUsuario(nuevoUsuario).subscribe({
      next: (response) => {
        console.log('Usuario creado exitosamente', response);
        this.procesoMsg("USUARIO CREACO CON EXITO.");

        //limpia despues de guardar
        this.form.reset(); 
        this.router.navigate(['/menu-admin']); // Cambia '/menu' a la ruta que necesites
        this.isSubmitting = false; //se habilita boton guardar
      },
      error: (error) => {
        console.error('Error al crear el usuario', error);
        this.procesoMsg("ERROR AL CREAR REGISTRO.");
        this.isSubmitting = false; //se habilita boton guardar
      }

    });
  
  }

  //mensajes de alerta
  procesoMsg(msj: string) {
    const snackBarRef = this.snackBar.open(msj, 'Cerrar', {
      duration: 20000,
      verticalPosition: 'top',
      panelClass: ['snackbar-confirm'],
    });
  
    
  }
  

  // Función para limpiar los campos del formulario
  limpiar(): void {
    this.form.reset(); // Resetea todos los campos del formulario
  }


}
