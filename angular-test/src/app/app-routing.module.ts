import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormularioComponent } from './formulario/formulario.component';
import { LoginComponent } from './login/login.component';
import { PruebaComponent } from './prueba/prueba.component';
import { MenuExpedienteComponent } from './menu-expediente/menu-expediente.component';
import { CrearExpedienteComponent } from './crear-expediente/crear-expediente.component'; // Importa el componente Crear Expediente
import { ModificarExpedienteComponent } from './modificar-expediente/modificar-expediente.component'; // Importa el componente Modificar Expediente 
import { CitasComponent } from './citas/citas.component';
import { MenuCitasComponent } from './menu-citas/menu-citas.component';
import { CrearCitaComponent } from './crear-cita/crear-cita.component';
import { ConsultarCitaComponent } from './consultar-cita/consultar-cita.component';
import { ModificarCitaComponent } from './modificar-cita/modificar-cita.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'formulario', component: FormularioComponent},
  {path: 'prueba', component: PruebaComponent},
  {path: 'menu-expediente', component: MenuExpedienteComponent }, // Ruta para el componente Menu Expediente
  { path: 'crear-expediente', component: CrearExpedienteComponent }, // Ruta para Crear Expediente
  { path: 'modificar-expediente', component: ModificarExpedienteComponent }, // Ruta para Modificar Expediente
  { path: 'citas', component: CitasComponent }, 
  {path: 'menu-citas', component: MenuCitasComponent}, //ruta para el componente menu citas
  {path: 'crear-cita', component: CrearCitaComponent}, //ruta para el componente crear citas
  {path: 'consultar-cita', component: ConsultarCitaComponent}, //ruta para el componente consultar citas
  {path: 'modificar-cita', component: ModificarCitaComponent}, //ruta para el componente crear citas
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
