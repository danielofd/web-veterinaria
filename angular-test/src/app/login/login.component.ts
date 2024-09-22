import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: string = "";
  password: string = "";

  formularioLogin: FormGroup

  constructor(private form: FormBuilder, private router: Router) {
    this.formularioLogin = this.form.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {

    this.user = this.formularioLogin.get('user')?.value
    this.password = this.formularioLogin.get('password')?.value

    if (this.user === 'user' && this.password === '123') {
      this.router.navigate(['/home'])
    } else {
      alert('Verifique su usuario y contraseña...');
      this.router.navigate(['/login'])
    }

  }

  hasErrors(controlName: string, errorType: string) {
    return this.formularioLogin.get(controlName)?.hasError(errorType) && this.formularioLogin.get(controlName)?.touched
  }

}
