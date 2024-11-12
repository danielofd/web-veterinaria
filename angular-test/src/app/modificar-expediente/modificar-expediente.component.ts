import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosService } from '../service/datos.service';
import { TipoMascota } from 'src/models/tipo-mascota';
import { Raza } from 'src/models/raza';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { HttpResponse } from '@angular/common/http';

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

  selectedRaza: number=0; // Valor seleccionado

  codExpediente: string="";

  nombreTipo: string="";
  nombreRaza: string="";

  constructor( private route: ActivatedRoute, private datosService: DatosService, private router: Router, private dialog: MatDialog,private http: HttpClient,
    private fb: FormBuilder,private snackBar: MatSnackBar){

      // Inicializa el formulario aquí    
      this.formulario = this.fb.group({
        masId: ['', Validators.required], // Código de Expediente
        masNombre: ['', Validators.required],//
        masPropietario: ['', Validators.required],//
        masColor: ['', Validators.required],//
        masGenero:['', Validators.required],
        razNombre:['', Validators.required],//
        timGrupo:['', Validators.required],//
        masPeso:['', [Validators.required,  Validators.pattern('^[0-9]{1,3}(\.[0-9]{1,2})?$')]],
        masTemperatura:['', Validators.required],
        masFrecardiaca:['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        masDireccion:['', Validators.required],
        masTelefono:['', [Validators.required]],
        masMedReferido:['', Validators.required],
        masCorreo:['', [Validators.required, Validators.email]],
        raza:[''],
        tipo:['']

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
       
        //guarda codExpediente
        this.codExpediente = registro.masId;
        console.log("codigo expediente => " +this.codExpediente)

        this.selectedRaza=Number(registro.razId);
        console.log("id raza => " +this.selectedRaza);

        this.nombreRaza=registro.razNombre;
        this.nombreTipo=registro.timGrupo;

        /*
        registro.fecha='';
        registro.veterinario='';
        registro.hora='';
        */

        console.log(registro);


        const expediente = {
          masId: registro.masId,
          masNombre: registro.masNombre,
          masPropietario: registro.masPropietario,
          masGenero: registro.masGenero,
          masColor: registro.masColor,
          masPeso: registro.masPeso,
          masTemperatura: registro.masTemperatura,
          masFrecardiaca: registro.masFrecardiaca,
          masDireccion: registro.masDireccion,
          masTelefono: registro.masTelefono,
          masMedReferido: registro.masMedReferido,
          masCorreo: registro.masCorreo,
          raza: registro.razNombre,
          tipo: registro.timGrupo,
          razId:registro.razId,
          razNombre: registro.razNombre
        };

        console.log("obj enviado a form: "+expediente);

        //this.formulario.patchValue(registro); // Rellenar el formulario con los datos

        this.formulario.patchValue(expediente); // Rellenar el formulario con los datos

        //this.fillForm(); // Llenar el formulario con los datos
      }
    });

    this.detectarCambioTipo();
   
  }


  regresar(): void {
    // Ejemplo de redirección a una ruta específica
    this.router.navigate(['/consultar-expediente']); // Cambia '/menu' a la ruta que necesites
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

  //modificar expediente inicio  
  modificarExpediente() {

    if (this.formulario.get('masId')?.invalid ||
    this.formulario.get('masNombre')?.invalid ||
    this.formulario.get('masPropietario')?.invalid 
   
    ||
    this.formulario.get('masCorreo')?.invalid 
     
    ||
    this.formulario.get('masGenero')?.invalid 
   
    ||
    this.formulario.get('masColor')?.invalid 
    ||
    this.formulario.get('masPeso')?.invalid 
    ||
    this.formulario.get('masTemperatura')?.invalid 
   
    ||
    this.formulario.get('masFrecardiaca')?.invalid 
    ||
    this.formulario.get('masDireccion')?.invalid 
    ||
    this.formulario.get('masTelefono')?.invalid 
     /*
    ||
    this.formulario.get('razNombre')?.invalid
    */
    ) {
      // Aquí puedes mostrar un mensaje o hacer algo en caso de que el formulario sea inválido
      this.procesoMsg('POR FAVOR COMPLETAR TODOS LOS CAMPOS OBLIGATORIOS(*).');
      return; // Evita continuar si el formulario no es válido
    }

  console.log("campos correctos");
  
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('guardando...');
        // Lógica para guardar el expediente
        this.realizarGuardado();
      } else {
        console.log('Guardado cancelado');
      }
    });
    
  }

  //ejecuta modificacion
  realizarGuardado() {
    
   let usuCod:String| undefined;;

   //Este es el campo usu_codigo (pendiente)
    //this.expediente.usuCodigo = 'FD100814';
    this.datosService.currentData.subscribe(data =>{
      console.log("usu correlativo: "+data);
      usuCod = data
    });



    // Creamos un objeto constante para agrupar los valores
const expediente = {
  masId: this.formulario.get('masId')?.value.toUpperCase(),
  masNombre: this.formulario.get('masNombre')?.value.toUpperCase(),
  masPropietario: this.formulario.get('masPropietario')?.value.toUpperCase(),
  masGenero: this.formulario.get('masGenero')?.value,
  masColor: this.formulario.get('masColor')?.value.toUpperCase(),
  masPeso: this.formulario.get('masPeso')?.value,
  masTemperatura: this.formulario.get('masTemperatura')?.value,
  masFrecardiaca: this.formulario.get('masFrecardiaca')?.value,
  masDireccion: this.formulario.get('masDireccion')?.value.toUpperCase(),
  masTelefono: this.formulario.get('masTelefono')?.value,
  masMedReferido: this.formulario.get('masMedReferido')?.value.toUpperCase(),
  masCorreo: this.formulario.get('masCorreo')?.value,
  //raza: this.formulario.get('razNombre')?.value,  // Raza ya definida
  raza: {

    razId: isNaN(parseInt(this.formulario.get('razNombre')?.value, 10))
      ? this.selectedRaza
      : parseInt(this.formulario.get('razNombre')?.value, 10)

    
    //razId: parseInt(this.formulario.get('razNombre')?.value, 10)
  },
  usuCodigo: usuCod
};

    
    console.log(expediente)

    //agrego break para que no haga la peticion
    //return;


    this.datosService.modificarExpediente(expediente).subscribe(
      (data) => {
        //const postResponseMessage = data.body?.postResponse;
        console.log("Respuesta del servidor:", data.postResponse);
    
        if (data.postResponse === "Expediente actualizado exitosamente") {
          this.procesoMsg("EXPEDIENTE ACTUALIZADO CON EXITO");
          this.router.navigate(['/consultar-expediente']);
        } else {
          this.procesoMsg("NO SE PUDO MODIFICAR EL REGISTRO.");
        }
      },
      (error) => {
        console.error("Error en la solicitud:", error);
        this.procesoMsg("Hubo un problema al modificar el expediente.");
      }
    );
    

    
    /*
    this._service.crearNuevoExpediente(this.expediente).subscribe(((res: HttpResponse<any>) => {
      console.log(res);
      //alert(res);
      const statusCode = res.status;
      const codExpedienteGen = res.body.idRecord;
      console.log(statusCode);
      console.log(codExpedienteGen);
      if(statusCode===200){
        this.procesoMsg("REGISTRO CREADO CON EXITO.\n No DE EXPEDIENTE GENERADO: "+codExpedienteGen);
      }else{
        this.procesoMsg("NO SE PUDO GUARDAR EL REGISTRO.");
      }

     
      this.formularioRegistro.reset();
    }));
    */


  }
  

  procesoMsg(msj: string) {
    const snackBarRef = this.snackBar.open(msj, 'Cerrar', {
      duration: 20000,
      panelClass: ['snackbar-confirm'],
      verticalPosition: 'top',
    });
  
    
  }

  limpiarFormulario(){
    this.formulario.reset(); // Limpia el formulario
    //this.registros=[];
    //this.isFechaRequired = false;  // Muestra el mensaje si la fecha está vacía

    this.formulario.reset({
      masGenero: '1',  // Establecer "TODAS" como valor por defecto
      timGrupo: '',
      masId: this.codExpediente,
      raza:this.nombreRaza,
      tipo:this.nombreTipo,
      razId:this.selectedRaza,
      masMedReferido:''
    });

  }


    // En tu componente TypeScript
validateAlpha(event: KeyboardEvent): void {
  const regex = /^[A-Za-z\s]*$/;  // Solo permite letras y espacios
  const char = event.key;

  if (!regex.test(char)) {
      event.preventDefault();  // Bloquea la tecla si no es una letra o espacio
  }
}

hasErrors(controlName: string, errorType: string) {

  console.log(errorType);

  return this.formulario.get(controlName)?.hasError(errorType) && this.formulario.get(controlName)?.touched
}


// Método para validar en tiempo real usando keypress
validateEmailOnKeypress(event: KeyboardEvent): void {
  const emailInput = event.target as HTMLInputElement;
  const emailValue = emailInput.value;
  
  // Expresión regular simple para validar correos electrónicos
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
  if (emailPattern.test(emailValue)) {
    emailInput.setCustomValidity('');
  } else {
    emailInput.setCustomValidity('Correo electrónico no válido');
  }
}

 // Método para validar la entrada de números decimales
 validateDecimalInput(event: KeyboardEvent): void {
  const inputChar = String.fromCharCode(event.charCode); // Obtener el carácter presionado
  const currentValue = (event.target as HTMLInputElement).value; // Obtener el valor actual del input
  
  // Expresión regular para validar que solo se ingresen números y un punto decimal
  const validPattern = /^[0-9]{1,3}(\.[0-9]{0,2})?$/;

  // Si la tecla presionada es un número o el punto decimal y el valor sigue el patrón
  if (!validPattern.test(currentValue + inputChar)) {
    event.preventDefault(); // Bloquear la tecla si no cumple con el patrón
  }
}

// Método para validar la entrada de solo números enteros en el evento keypress
validateIntegerInput(event: KeyboardEvent): void {
  const inputChar = String.fromCharCode(event.charCode); // Obtener el carácter presionado
  
  // Si el carácter presionado no es un número (del 0 al 9), prevén la entrada
  if (!/^[0-9]$/.test(inputChar)) {
    event.preventDefault();  // Bloquear la entrada no válida
  }
}
  

  validarNumeros(event: KeyboardEvent) {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) { // Verificar si no es un número
      event.preventDefault(); // Bloquear la tecla
    }
  }





}
