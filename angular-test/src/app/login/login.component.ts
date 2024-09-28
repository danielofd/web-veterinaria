import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: string = "";
  password: string = "";

  formularioLogin: FormGroup

  constructor(private form: FormBuilder, private router: Router, private authService: AuthService) {
    this.formularioLogin = this.form.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  /** 
  login(role: 'admin' | 'assistant') {

    this.authService.setCurrentUser({ role });

    this.user = this.formularioLogin.get('user')?.value
    this.password = this.formularioLogin.get('password')?.value


    if (this.formularioLogin.invalid) {
      this.formularioLogin.markAllAsTouched();
      return;
    }

    if(this.user === 'admin' && this.password === 'admin'){

    }else
    if(this.user === 'assistant' && this.password === 'assistant'){

    }

    if (this.user === 'user' && this.password === '123') {

      if (role === 'admin') {
        console.log("Entro como admin");
        this.router.navigate(['/expedientes']); // Ruta para el administrador
      }
      if (role === 'assistant') {
        console.log("Entro como asistente");
        this.router.navigate(['/expedientes']); // Ruta para el administrador
      }

      this.router.navigate(['/home'])
      console.log(this.formularioLogin);
    } else {
      alert('Verifique su usuario y contraseña...');
      this.router.navigate(['/login'])
    }

  }

  */
  login() {
    this.user = this.formularioLogin.get('user')?.value;
    this.password = this.formularioLogin.get('password')?.value;

    if (this.formularioLogin.invalid) {
        this.formularioLogin.markAllAsTouched();
        return;
    }
    /*
    // Verificar las credenciales
    if ((this.user === 'admin' && this.password === 'admin') || 
        (this.user === 'asistente' && this.password === 'asistente') || 
        (this.user === 'veterinario' && this.password === 'veterinario')) { // Validación para veterinario
        
        // Configurar el usuario actual en el servicio
        this.authService.setCurrentUser({ role: this.user as 'admin' | 'asistente' | 'veterinario' });

        // Navegar según el rol
        if (this.user === 'admin') {
            console.log("Entro como admin");
            this.router.navigate(['/home']);
        } else if (this.user === 'asistente') {
            console.log("Entro como asistente");
            this.router.navigate(['/home']);
        } else if (this.user === 'veterinario') { // Navegación para veterinario
            console.log("Entro como veterinario");
            this.router.navigate(['/home']);
        }
    } else {
        alert('Verifique su usuario y contraseña...');
        this.router.navigate(['/login']);
    }
        */
      //integracion con api rest
      this.authService.login(this.user, this.password).subscribe({
        next: (response) => {
          console.log(response);
            // Asegúrate de que la respuesta contenga rolId y rolNombre
            //if (response && response.rolId && response.rolNombre) {

              if(response){
                // Configurar el usuario actual con rolId y rolNombre
               
                /**
                this.authService.setCurrentUser({
                    //roleId: response.rolId,
                    //roleName: response.rolNombre,
                    
                    role: response.rolNombre as 'Admin' | 'Asistente' | 'Veterinario'
                });
                */
                const rolNombre = response.rolNombre;
                console.log("Rol: ", rolNombre); // Verifica si rolNombre es correcto

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
                  alert('Error en las credenciales.');
                this.router.navigate(['/login']);
                }
               
               this.authService.setCurrentUser(response);
                // Navegar según el rol
                //this.router.navigate(['/home']);
            } 
            /**
            else {
                alert('Error en las credenciales.');
                this.router.navigate(['/login']);
            }
            */
        },
        error: () => {
            alert('Error en las credenciales.');
            this.router.navigate(['/login']);
        }
    });
}



  hasErrors(controlName: string, errorType: string) {
    return this.formularioLogin.get(controlName)?.hasError(errorType) && this.formularioLogin.get(controlName)?.touched
  }

}
