import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosService } from '../service/datos.service';
import { TipoMascota } from 'src/models/tipo-mascota';
import { Raza } from 'src/models/raza';

@Component({
  selector: 'app-modificar-expediente',
  templateUrl: './modificar-expediente.component.html',
  styleUrls: ['./modificar-expediente.component.css']
})
export class ModificarExpedienteComponent implements OnInit {

  isLoading = false;       // Estado de carga

  //razas$ = this.razaService.getRazas(); 

  formulario: FormGroup;

  mensaje: string = "";

  tiposMascotas: TipoMascota[] = [];

  razas: Raza[]=[];

  selectedRaza: string | undefined; // Valor seleccionado

  constructor( private route: ActivatedRoute, private datosService: DatosService, private router: Router, private dialog: MatDialog,private http: HttpClient,
    private fb: FormBuilder,private snackBar: MatSnackBar){

      // Inicializa el formulario aquí    
      this.formulario = this.fb.group({
        masId: ['', Validators.required], // Código de Expediente
        masNombre: ['', Validators.required],
        masPropietario: ['', Validators.required],
        masColor: ['', Validators.required],
        masGenero:['', Validators.required],
        razNombre:['', Validators.required],
        timGrupo:['', Validators.required],
        masPeso:['', Validators.required],
        masTemperatura:['', Validators.required],
        masFrecardiaca:['', Validators.required],
        masDireccion:['', Validators.required],
        masTelefono:['', Validators.required],
        masMedReferido:['', Validators.required],
        masCorreo:['', Validators.required],

    });

  }

  ngOnInit(): void {

    //carga select tipo mascota
    this.cargarTipoMascotas();


    

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

    this.detectarCambioTipo();
   
  }


  regresar(): void {
    // Ejemplo de redirección a una ruta específica
    this.router.navigate(['/menu-expediente']); // Cambia '/menu' a la ruta que necesites
  }

  //carga select de tipo mascota
  cargarTipoMascotas():void{
    this.datosService.getTipoMascotas().subscribe(
      (response) =>{
      
        this.tiposMascotas = response;

        const existeFelino = this.tiposMascotas.some(tipo => tipo.timGrupo === 'FELINO');
        if (existeFelino) {
          this.mensaje = 'La clase FELINO está disponible.';
          console.log(existeFelino)
        } else {
          this.mensaje = 'La clase FELINO no está disponible.';
        }
        
      },
      (error)=>{
        console.error('Error al cargar los tipos de mascotas', error);
      }
    );
  }

  //carga las razas
  cargarRazas(value: string):void{
    this.isLoading = true;  // Indicamos que estamos cargando los datos
    this.razas = [];  // Limpiamos las razas anteriores
    this.datosService.getRazas(value).subscribe(
      (response)=>{
        console.log(response)

        console.log("entra al select raza "+this.isLoading);

        this.razas = response;
        this.isLoading = false; // Desactivamos el estado de carga
        
      },
      (error)=>{
        console.error('Error al cargar la razas', error);
        this.isLoading = false; // Desactivamos el estado de carga
        
      }
    )

    
    
  }

 
  // Método para detectar cambios en la selección del 'timGrupo'
  detectarCambioTipo() {
    // Nos suscribimos al valor del campo 'timGrupo'
    this.formulario.get('timGrupo')?.valueChanges.subscribe(
      (nuevoValor) => {
        console.log('Tipo seleccionado:', nuevoValor);
        // Puedes manejar el valor seleccionado como desees
        //this.cargarRazas(nuevoValor);
        // Verificar si el valor seleccionado no es vacío
      if (nuevoValor) {
        // Si el valor no es vacío, hacemos la llamada para cargar las razas
        this.cargarRazas(nuevoValor);
      } else {
        // Si es vacío, limpiamos las razas y el estado de carga
        this.razas = [];
        this.isLoading = false;
        this.formulario.get('razNombre')?.reset(); // Limpiamos la selección de raza
      }

      }
    );
  }

  

}
