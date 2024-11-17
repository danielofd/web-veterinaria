import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl  } from '@angular/forms';
import { Router } from '@angular/router';
import { Registro } from 'src/models/registro';
import { NuevoExpedienteServiceService } from '../service/nuevo-expediente-service.service';
import { Raza } from 'src/models/raza';
import { asyncColorValidator, asyncNombreMascotaValidator, asyncTemperatureValidator, asynPesoValidator, asynTelefonoValidator } from 'src/app/functions/async_functions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component'
import { DatosService } from '../service/datos.service';
import { TipoMascota } from 'src/models/tipo-mascota';
import { HttpResponse } from '@angular/common/http';

function soloLetras(control: AbstractControl): { [key: string]: boolean } | null {
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Permite letras y espacios
  if (!control.value || regex.test(control.value)) {
    return null; // Si es válido, no devuelve ningún error
  }
  return { soloLetras: true }; // Devuelve el error 'soloLetras'
}
function formatoTelefono(control: AbstractControl): { [key: string]: boolean } | null {
  const regex = /^\d{4}-\d{4}$/; // Expresión regular para el formato 9999-9999
  if (!control.value || regex.test(control.value)) {
    return null; // Si es válido, no devuelve ningún error
  }
  return { formatoInvalido: true }; // Devuelve el error 'formatoInvalido'
}
@Component({
  selector: 'app-crear-expediente',
  templateUrl: './crear-expediente.component.html',
  styleUrls: ['./crear-expediente.component.css']
})
export class CrearExpedienteComponent implements OnInit{

  tiposMascotas: TipoMascota[] = [];
  selectedTipoMascota: number |null=null;

  razas: Raza[]=[];
  selectedRaza: number |null=null;

  expediente: Registro = new Registro();
  raza: Raza = new Raza();

  tipoAnimal: string[] = ['Felino', 'Canino'];
  razaAnimal: string[] = [];

  razaGato: string[] = ['Gato Persa', 'Gato Siamés', 'Gato Maine Coon', 'Gato Bengalí', 'Gato Sphynx'];
  razaPerro: string[] = ['Labrador', 'Pastor Alemán', 'Bulldog', 'Golden Retriever', 'Beagle'];

  formularioRegistro: FormGroup;
  mensaje: string = "";
 
  

  constructor(private form: FormBuilder, private router: Router, private _service: NuevoExpedienteServiceService, 
    private snackBar: MatSnackBar, private dialog: MatDialog,private datosService: DatosService) {
    this.formularioRegistro = this.form.group({
      name: ['', 
        [Validators.required, Validators.maxLength(50), soloLetras],[asyncNombreMascotaValidator()]],
      owner: ['', [Validators.required, Validators.maxLength(50),soloLetras],[asyncNombreMascotaValidator()]], //tamaño 50
      animal: ['',Validators.required],
      gender: ['', Validators.required],
      raza: ['',Validators.required],
      color: ['', [Validators.required,soloLetras], [asyncColorValidator()]],
      weight: ['0.00', [Validators.required], [asynPesoValidator()]],
      temp: ['0.00', [Validators.required], [asyncTemperatureValidator()]],
      frec: ['', [Validators.required], [asyncTemperatureValidator()]],
      address: ['', Validators.required, [asyncNombreMascotaValidator()]], // tamaño 50
      phone: ['', [Validators.required, Validators.maxLength(9), formatoTelefono], [asynTelefonoValidator()]], //tamaño 10
      med: ['',[Validators.maxLength(50), soloLetras]], //tamaño 50
      date: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(40)]]
    });
  }

  ngOnInit(): void {
    this.cargarTipoMascotas();
    //this.cargarRazas();
    this.formularioRegistro.get('animal')?.valueChanges.subscribe(value => {

      console.log(value);
      /*
      if (value === 'Felino') {
        this.razaAnimal = this.razaGato;
      } else if (value === 'Canino') {
        this.razaAnimal = this.razaPerro;
      }
      */
     if(value){
      this.razas=[];
      this.cargarRazas(value);
     }
      

    });
    
  }

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

  cargarRazas(value: string):void{
    this.datosService.getRazas(value).subscribe(
      (response)=>{
        console.log(response)
        this.razas = response;
        
      },
      (error)=>{
        console.error('Error al cargar la razas', error);
        
      }
    )
    
  }



  // Método para regresar al menú o a la página anterior
  regresar(): void {
    // Ejemplo de redirección a una ruta específica
    this.router.navigate(['/menu-expediente']); // Cambia '/menu' a la ruta que necesites
  }

  // Método para guardar el expediente
  /** 
  guardarExpediente() {

    this.expediente.masNombre = this.formularioRegistro.get('name')?.value;
    this.expediente.masPropietario = this.formularioRegistro.get('owner')?.value;
    this.expediente.masGenero = this.formularioRegistro.get('gender')?.value;
    this.expediente.masColor = this.formularioRegistro.get('color')?.value;
    this.expediente.masPeso = this.formularioRegistro.get('weight')?.value;
    this.expediente.masTemperatura = this.formularioRegistro.get('temp')?.value;
    this.expediente.masFrecardiaca = this.formularioRegistro.get('frec')?.value;
    this.expediente.masDireccion = this.formularioRegistro.get('address')?.value;
    this.expediente.masTelefono = this.formularioRegistro.get('phone')?.value;
    this.expediente.masMedReferido = this.formularioRegistro.get('med')?.value;

    this.raza.razId = 1;
    this.expediente.raza = this.raza;
    //Este es el campo usu_codigo (pendiente)
    this.expediente.usuCodigo = 'FD100814';
    this._service.crearNuevoExpediente(this.expediente).subscribe((res => {
      console.log(res);
      alert(res);
      this.formularioRegistro.reset();
    }));
  }
  */
  guardarExpediente() {

    if (this.formularioRegistro.get('name')?.invalid ||
    this.formularioRegistro.get('owner')?.invalid ||
    this.formularioRegistro.get('animal')?.invalid ||
    this.formularioRegistro.get('gender')?.invalid ||
    this.formularioRegistro.get('raza')?.invalid ||
    this.formularioRegistro.get('color')?.invalid ||
    this.formularioRegistro.get('weight')?.invalid ||
    this.formularioRegistro.get('temp')?.invalid ||
    this.formularioRegistro.get('frec')?.invalid ||
    this.formularioRegistro.get('address')?.invalid ||
    this.formularioRegistro.get('phone')?.invalid ||
    this.formularioRegistro.get('email')?.invalid) {
      // Aquí puedes mostrar un mensaje o hacer algo en caso de que el formulario sea inválido
      this.procesoMsg('POR FAVOR COMPLETAR TODOS LOS CAMPOS OBLIGATORIOS(*).');
      return; // Evita continuar si el formulario no es válido
  }

    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Lógica para guardar el expediente
        this.realizarGuardado();
      } else {
        console.log('Guardado cancelado');
      }
    });
  }

  realizarGuardado() {
    this.expediente.masNombre = this.formularioRegistro.get('name')?.value.toUpperCase();
    this.expediente.masPropietario = this.formularioRegistro.get('owner')?.value.toUpperCase();
    this.expediente.masGenero = this.formularioRegistro.get('gender')?.value.toUpperCase();
    this.expediente.masColor = this.formularioRegistro.get('color')?.value.toUpperCase();
    this.expediente.masPeso = this.formularioRegistro.get('weight')?.value;
    this.expediente.masTemperatura = this.formularioRegistro.get('temp')?.value;
    this.expediente.masFrecardiaca = this.formularioRegistro.get('frec')?.value;
    this.expediente.masDireccion = this.formularioRegistro.get('address')?.value.toUpperCase();
    this.expediente.masTelefono = this.formularioRegistro.get('phone')?.value;
    this.expediente.masMedReferido = this.formularioRegistro.get('med')?.value.toUpperCase();
    this.expediente.masCorreo = this.formularioRegistro.get('email')?.value;
    console.log(this.formularioRegistro.valid); 
    this.raza.razId = 1;
    this.expediente.raza = this.raza;
    //Este es el campo usu_codigo (pendiente)
    //this.expediente.usuCodigo = 'FD100814';
    this.datosService.currentData.subscribe(data =>{
      console.log("usu correlativo: "+data.usuCorreltivo);
      this.expediente.usuCodigo = data.usuCorreltivo
    });
    console.log(this.expediente)
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
  }

  limpiar(): void {
    this.formularioRegistro.reset(); // Limpia el formulario
    this.razas=[];
    this.tipoAnimal=[];
  }

  hasErrors(controlName: string, errorType: string) {
    return this.formularioRegistro.get(controlName)?.hasError(errorType) && this.formularioRegistro.get(controlName)?.touched
  }

  procesoMsg(msj: string) {
    const snackBarRef = this.snackBar.open(msj, 'Cerrar', {
      duration: 20000,
      verticalPosition: 'top',
      panelClass: ['snackbar-confirm'],
    });
  
    
  }
  
  procesoMsgError() {
    const snackBarRef = this.snackBar.open('Datos incompletos, por favor revise el formulario.', 'Cerrar', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: ['snackbar-error'], // Puedes definir un estilo diferente para los mensajes de error
    });
  }
  formatWeight(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    
    if (!isNaN(value)) {
      // Formatear el valor con dos decimales
      input.value = value.toFixed(2);
    } else {
      // Si no es un número, puedes limpiar el campo o establecer un valor predeterminado
      input.value = '0.00';
    }
  } 
  selectAll(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.select(); // Selecciona todo el texto del campo
  }
  formatPhone(value: string): string {
    // Eliminar caracteres no numéricos
    const cleaned = value.replace(/\D/g, '');
    // Aplicar formato 9999-9999
    if (cleaned.length >= 8) {
      return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}`;
    }
    return value; // Devuelve el valor original si no tiene suficientes dígitos
  }
  onBlurPhone(): void {
    const phoneControl = this.formularioRegistro.get('phone');
    if (phoneControl && phoneControl.value) {
      phoneControl.setValue(this.formatPhone(phoneControl.value));
    }
  }

  onBlurEmail() {
    const emailControl = this.formularioRegistro.get('email');

    // Marca el control como tocado para mostrar los errores
    if (emailControl) {
        emailControl.markAsTouched();
    }

    // Aquí puedes agregar lógica adicional si necesitas realizar acciones específicas
    // Por ejemplo, podrías verificar el valor o hacer alguna llamada a un servicio
}
validateFormat(event: KeyboardEvent | ClipboardEvent) {
  let key: string;

  // Verifica si el evento es un pegado
  if (event instanceof ClipboardEvent) {
    key = event.clipboardData?.getData('text/plain') || '';
  } else {
    const keyCode = (event as KeyboardEvent).key;
    key = keyCode;
  }

  const regex = /^[0-9]*$/; // Solo permite números enteros

  // Verifica si la tecla es un número o una tecla de control (retroceso, suprimir, flechas, etc.)
  if (!regex.test(key) && !this.isControlKey(event)) {
    event.preventDefault();
  }
}

isControlKey(event: KeyboardEvent | ClipboardEvent): boolean {
  // Verifica si la tecla presionada es una tecla de control común (retroceso, suprimir, flechas, etc.)
  const controlKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
  return controlKeys.includes((event as KeyboardEvent).key);
}

}