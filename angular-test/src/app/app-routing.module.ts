import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormularioComponent } from './formulario/formulario.component';
import { LoginComponent } from './login/login.component';
import { PruebaComponent } from './prueba/prueba.component';
import { MenuExpedienteComponent } from './menu-expediente/menu-expediente.component';
import { CrearExpedienteComponent } from './crear-expediente/crear-expediente.component'; // Importa el componente Crear Expediente
import { ModificarExpedienteComponent } from './modificar-expediente/modificar-expediente.component'; // Importa el componente Modificar Expediente 

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'formulario', component: FormularioComponent},
  {path: 'prueba', component: PruebaComponent},
  {path: 'menu-expediente', component: MenuExpedienteComponent }, // Ruta para el componente Menu Expediente
  { path: 'crear-expediente', component: CrearExpedienteComponent }, // Ruta para Crear Expediente
  { path: 'modificar-expediente', component: ModificarExpedienteComponent }, // Ruta para Modificar Expediente
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
