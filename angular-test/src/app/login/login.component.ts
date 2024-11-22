import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';
import { DatosService } from '../service/datos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isPasswordVisible: boolean = false;  // Controla la visibilidad de la contraseña

  isLoggingIn: boolean = false; //para activar-desactivar boton

  user: string = "";
  password: string = "";

  formularioLogin: FormGroup;

  //para roles
  roles: any[] = [];

  constructor(private datosService: DatosService,private form: FormBuilder, private router: Router, private authService: AuthService, private dialog: MatDialog) {
    this.formularioLogin = this.form.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.obtenerRoles();
  }

  
  login() {
    this.user = this.formularioLogin.get('user')?.value;
    this.password = this.formularioLogin.get('password')?.value;

    if (this.formularioLogin.invalid) {
        this.formularioLogin.markAllAsTouched();
        this.openDialog('Por favor, ingrese los datos válidos para continuar.');
        return;
    }
    

    this.isLoggingIn = true; // Activar el estado de "Logeando..."


      //integracion con api rest
      this.authService.login(this.user, this.password).subscribe({
        next: (response) => {
          console.log(response);
            // Asegúrate de que la respuesta contenga rolId y rolNombre
            //if (response && response.rolId && response.rolNombre) {

              if(response){
                // Configurar el usuario actual con rolId y rolNombre
               //almacena el codigo del empleado
               const usuCorrelativo = response.usuCorreltivo;
               //this.datosService.changeData(usuCorrelativo);
                /**
                this.authService.setCurrentUser({
                    //roleId: response.rolId,
                    //roleName: response.rolNombre,
                    
                    role: response.rolNombre as 'Admin' | 'Asistente' | 'Veterinario'
                });
                */
                const rolNombre = response.rolNombre;
                console.log("Rol: ", rolNombre); // Verifica si rolNombre es correcto

                this.datosService.changeData(response);

                // Evaluar el campo rolNombre
                if (rolNombre === 'Asistente') {
                    console.log("Usuario es asistente.");
                    this.router.navigate(['/home']);
                } else if (rolNombre === 'Admin') {
                    console.log("Usuario es admin.");
                    this.router.navigate(['/home']);
                } else if (rolNombre === 'Veterinario') {
                    console.log("Usuario es veterinario.");
                    this.router.navigate(['/home']);
                }else{
                  //alert('Error en las credenciales.');
                this.openDialog('El usuario/contraseña no son válidos');
                this.router.navigate(['/login']);
                }
               
               this.authService.setCurrentUser(response);
                // Navegar según el rol
                //this.router.navigate(['/home']);
                this.isLoggingIn = false; // Desactivar el estado de "Logeando..."
            } 
            /**
            else {
                alert('Error en las credenciales.');
                this.router.navigate(['/login']);
            }
            */
        },
        error: () => {
            //alert('Error en las credenciales.');
            this.openDialog('El usuario/contraseña no son válidos');
            this.isLoggingIn = false; // Desactivar el estado de "Logeando..."
            this.router.navigate(['/login']);
        }
    });
}

openDialog(message: string): void {
  this.dialog.open(DialogErrorComponent, {
    data: { message }
  });
}



  hasErrors(controlName: string, errorType: string) {
    return this.formularioLogin.get(controlName)?.hasError(errorType) && this.formularioLogin.get(controlName)?.touched
  }

   // Método para alternar la visibilidad de la contraseña
   togglePassword(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
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

}