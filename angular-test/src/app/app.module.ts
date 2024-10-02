import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioComponent } from './formulario/formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PruebaComponent } from './prueba/prueba.component';
import { MenuExpedienteComponent } from './menu-expediente/menu-expediente.component';
import { CrearExpedienteComponent } from './crear-expediente/crear-expediente.component';
import { ModificarExpedienteComponent } from './modificar-expediente/modificar-expediente.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DialogErrorComponent } from './dialog-error/dialog-error.component';
import { CitasComponent } from './citas/citas.component';
import { MenuCitasComponent } from './menu-citas/menu-citas.component';
import { CrearCitaComponent } from './crear-cita/crear-cita.component';

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    LoginComponent,
    HomeComponent,
    PruebaComponent,
    MenuExpedienteComponent,
    CrearExpedienteComponent,
    ModificarExpedienteComponent,
    ConfirmDialogComponent,
    DialogErrorComponent,
    CitasComponent,
    MenuCitasComponent,
    CrearCitaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
