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
import { ConsultarExpedienteComponent } from './consultar-expediente/consultar-expediente.component';
import { MenuConsultaMedicaComponent } from './menu-consulta-medica/menu-consulta-medica.component';
import { ConsultarHistorialMedicoComponent } from './consultar-historial-medico/consultar-historial-medico.component';
import { AgregarConsultaMedicaComponent } from './agregar-consulta-medica/agregar-consulta-medica.component';
import { VerHistorialMedicoComponent } from './ver-historial-medico/ver-historial-medico.component';
import { ModificarConsultaComponent } from './modificar-consulta/modificar-consulta.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { CrearRolComponent } from './crear-rol/crear-rol.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { ModificarConsultaMedicaComponent } from './modificar-consulta-medica/modificar-consulta-medica.component';
import { AgregarTratamientoComponent } from './agregar-tratamiento/agregar-tratamiento.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'formulario', component: FormularioComponent},
  {path: 'prueba', component: PruebaComponent},
  {path: 'menu-expediente', component: MenuExpedienteComponent }, // Ruta para el componente Menu Expediente
  { path: 'crear-expediente', component: CrearExpedienteComponent }, // Ruta para Crear Expediente
  { path: 'consultar-expediente', component: ConsultarExpedienteComponent }, // Ruta para Crear Expediente
  { path: 'modificar-expediente', component: ModificarExpedienteComponent }, // Ruta para Modificar Expediente
  { path: 'citas', component: CitasComponent }, 
  {path: 'menu-citas', component: MenuCitasComponent}, //ruta para el componente menu citas
  {path: 'crear-cita', component: CrearCitaComponent}, //ruta para el componente crear citas
  {path: 'consultar-cita', component: ConsultarCitaComponent}, //ruta para el componente consultar citas
  {path: 'modificar-cita', component: ModificarCitaComponent}, //ruta para el componente modificar citas
  {path: 'menu-consulta-medica', component: MenuConsultaMedicaComponent}, //ruta para el componente menu consulta medica
  {path: 'consultar-historial-medico', component: ConsultarHistorialMedicoComponent}, //ruta para el componente consultar historial medico
  {path: 'agregar-consulta-medica', component: AgregarConsultaMedicaComponent}, //ruta para el componente agregar consulta medica
  {path: 'ver-historial-medico', component: VerHistorialMedicoComponent}, //ruta para el componente ver historial medico
  { path: 'modificar-consulta', component: ModificarConsultaComponent }, //ruta para el componente modificar consulta medica
  { path: 'menu-admin', component: MenuAdminComponent }, //ruta para el componente menu admin
  { path: 'crear-rol', component: CrearRolComponent }, //ruta para el componente crear rol
  { path: 'crear-usuario', component:  CrearUsuarioComponent }, //ruta para el componente crear usuario
  { path: 'modificar-consulta-medica', component:  ModificarConsultaMedicaComponent }, //ruta para el componente modificar consulta
  { path: 'agregar-tratamiento', component:  AgregarTratamientoComponent }, //ruta para el componente modificar consulta

  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
