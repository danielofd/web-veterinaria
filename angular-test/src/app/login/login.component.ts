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
}



  hasErrors(controlName: string, errorType: string) {
    return this.formularioLogin.get(controlName)?.hasError(errorType) && this.formularioLogin.get(controlName)?.touched
  }

}
