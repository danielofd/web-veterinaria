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
import { ConsultarCitaComponent } from './consultar-cita/consultar-cita.component';
import { MatTableModule } from '@angular/material/table';
import { ModificarCitaComponent } from './modificar-cita/modificar-cita.component';
import { ConsultarExpedienteComponent } from './consultar-expediente/consultar-expediente.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MenuConsultaMedicaComponent } from './menu-consulta-medica/menu-consulta-medica.component';
import { ConsultarHistorialMedicoComponent } from './consultar-historial-medico/consultar-historial-medico.component';
import { AgregarConsultaMedicaComponent } from './agregar-consulta-medica/agregar-consulta-medica.component';
import { VerHistorialMedicoComponent } from './ver-historial-medico/ver-historial-medico.component';

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
    CrearCitaComponent,
    ConsultarCitaComponent,
    ModificarCitaComponent,
    ConsultarExpedienteComponent,
    DeleteDialogComponent,
    MenuConsultaMedicaComponent,
    ConsultarHistorialMedicoComponent,
    AgregarConsultaMedicaComponent,
    VerHistorialMedicoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule // Agregar MatTableModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
