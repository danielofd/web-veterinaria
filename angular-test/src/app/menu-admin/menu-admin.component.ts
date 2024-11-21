import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent {

canCreateRole: boolean = true;//habilitar form crear rol
canCreateUser: boolean = true;//habilitar form crear usuario


constructor( private router: Router,) { }



//metodo para crear usuario
  createRole() {
    console.log("------creando nuevo rol------");
    this.router.navigate(['/crear-rol']);

  }


  
//metodo para crear rol
createUser() {
  console.log("-----creando nuevo usuario------");
  this.router.navigate(['/crear-usuario']);
  }

}
