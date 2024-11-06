import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosService } from '../service/datos.service';

@Component({
  selector: 'app-modificar-expediente',
  templateUrl: './modificar-expediente.component.html',
  styleUrls: ['./modificar-expediente.component.css']
})
export class ModificarExpedienteComponent implements OnInit {

  formulario: FormGroup;

  constructor( private route: ActivatedRoute, private datosService: DatosService, private router: Router, private dialog: MatDialog,private http: HttpClient,
    private fb: FormBuilder,private snackBar: MatSnackBar){

      // Inicializa el formulario aquí    
      this.formulario = this.fb.group({
        masId: ['', Validators.required], // Código de Expediente
        masNombre: ['', Validators.required],
        masPropietario: ['', Validators.required],


    });

  }

  ngOnInit(): void {
    //obtener datos pasados a traves de ruta
    this.route.params.subscribe(params => {
      const data = params['data'];
      //recibe los parametros aqui
     
      if (data) {

        //console.log(data.fecha);
        //data.fecha='';

        console.log("registro seleccionado: " +data);
        const registro = JSON.parse(data); // Parsear el JSON para obtener el objeto
       
        /*
        registro.fecha='';
        registro.veterinario='';
        registro.hora='';
        */

        console.log(registro);

        this.formulario.patchValue(registro); // Rellenar el formulario con los datos

        //this.fillForm(); // Llenar el formulario con los datos
      }
    });
   
  }


  regresar(): void {
    // Ejemplo de redirección a una ruta específica
    this.router.navigate(['/menu-expediente']); // Cambia '/menu' a la ruta que necesites
  }

  

}
