import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosService } from '../service/datos.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modificar-cita',
  templateUrl: './modificar-cita.component.html',
  styleUrls: ['./modificar-cita.component.css']
})
export class ModificarCitaComponent implements OnInit {

  propietario: string = '';  // Variable que almacena el valor del propietario

  registro: any;
  formulario: FormGroup;

  selectedVeterinarioId: number | null = null;
  selectedFecha: string = ''; // Fecha seleccionada

  horarios: any[] = [];
  selectedHorario: string = '';

  selectedVeterinario: string = '';

  veterinarios: any[] = [];

  fechaHoraFormat: string = '';

  codigoUsu: string = '';

  constructor( private route: ActivatedRoute, private datosService: DatosService, private router: Router, private dialog: MatDialog,private http: HttpClient,
    private fb: FormBuilder,private snackBar: MatSnackBar){

      // Inicializa el formulario aquí
    this.formulario = this.fb.group({
      id: [''],
      fecha: ['',Validators.required],
      hora: ['', Validators.required],
      propietario: ['',Validators.required],
      veterinario: ['',Validators.required]
    });

  }

  /**carga los datos de la fila seleccionada del listado de citas */
  ngOnInit(): void {


    let veterinarioNombre : string='';

    // Obtener los datos pasados a través de la ruta
    this.route.params.subscribe(params => {
      const data = params['data'];
      //recibe los parametros aqui
     
      if (data) {

        //console.log(data.fecha);
        //data.fecha='';

        console.log("registro seleccionado: " +data);
        const registro = JSON.parse(data); // Parsear el JSON para obtener el objeto

        veterinarioNombre = registro.veterinario;

        console.log("vet selected: "+veterinarioNombre)
       /*
        registro.fecha='';
        registro.veterinario='';
        registro.hora='';
        */
        //console.log(registro);

        this.selectedVeterinarioId=registro.veterinarioId;

        this.formulario.patchValue(registro); // Rellenar el formulario con los datos

        //this.fillForm(); // Llenar el formulario con los datos

        /**llenar los argumentos para consultar*/
        this.selectedVeterinarioId = registro.veterinarioId;
        this.selectedFecha = registro.fecha;

        console.log("----------------")
        console.log("vet id selected: "+ this.selectedVeterinarioId)
        console.log("fecha selected: "+ this.selectedFecha)
        console.log("----------------")


        /***cambios nuevos */
        this.cargarHorarios()


      }
    });


    /**cargar lista de veterinarios */
    this.cargarVeterinarios(veterinarioNombre);

  }


  cargarVeterinarios(nombreVet:string): void {
    
    this.datosService.obtenerVeterinarios().subscribe(
      (data) => {
        //console.log(data);
        this.veterinarios = data;

        console.log(this.veterinarios);

        /*
        const veterinarioEncontrado = this.veterinarios.find(vet => `${vet.empNombre} ${vet.empApellido}` === nombreVet);

        if (veterinarioEncontrado) {
          // Reordenar el array para poner al veterinario encontrado en la primera posición
          const veterinariosReordenados = [veterinarioEncontrado, ...this.veterinarios.filter(vet => vet !== veterinarioEncontrado)];
    
          // Actualizamos la lista de veterinarios
          this.veterinarios = veterinariosReordenados;
    
          // Establecer el valor del veterinario en el formulario (por defecto)
          this.formulario.get('veterinario')?.setValue(veterinarioEncontrado.empId);
        }
        */

      },
      (error) => {
        console.error('Error al cargar veterinarios', error);
      }
    );
    
   
  }

  regresar() {
    // Lógica para regresar, por ejemplo, redirigir a otra ruta
    this.router.navigate(['/consultar-cita']); // Reemplaza con tu ruta deseada
}

/**modificar cita */

  modificarCita(){

    /**validar campos que son obligatorios */
//     if (this.formulario.get('fecha')?.invalid ||
//   this.formulario.get('propietario')?.invalid ||
//   this.formulario.get('veterinario')?.invalid ||
//   this.formulario.get('hora')?.invalid) {
//     // Aquí puedes mostrar un mensaje o hacer algo en caso de que el formulario sea inválido
//     this.procesoMsg('POR FAVOR COMPLETAR TODOS LOS CAMPOS OBLIGATORIOS.');
//     return; // Evita continuar si el formulario no es válido
// }

// Obtener los valores del formulario
const { fecha, propietario, veterinario, hora } = this.formulario.value;

console.log("-----------------")
console.log(fecha);
console.log(propietario);
console.log(veterinario);
console.log(hora);
console.log("-----------------")

// if (this.formulario.invalid) {
//   // Aquí puedes proceder a guardar la cita
//   console.log('Cita modificada:', this.formulario.value);
//   this.procesoMsg('POR FAVOR COMPLETAR TODOS LOS CAMPOS OBLIGATORIOS.');
//   return; // Evita continuar si el formulario no es válido
// } 

 // Validar que los campos no estén vacíos
 if (!fecha || !propietario || !veterinario || !hora) {
  this.procesoMsg('POR FAVOR COMPLETAR TODOS LOS CAMPOS OBLIGATORIOS.');
  return; // Detener la ejecución si algún campo está vacío
}


    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Lógica para guardar el expediente
        //this.generarCita();

        this.executeModificar();

      } else {
        console.log('Guardado cancelado');
      }
    });

  }

  onFechaChange(event: Event): void {
    //limpia horarios 
    
    const inputElement = event.target as HTMLInputElement; // Casting a HTMLInputElement
    const fecha = inputElement.value;

    console.log(fecha);


    if (fecha) {
        this.selectedFecha = fecha;  // Actualiza la fecha seleccionada
        
        if (this.selectedVeterinarioId) {
            this.cargarHorarios(); // Carga horarios si ya hay un veterinario seleccionado
        }
    }
}

  cargarHorarios(): void {

    //probando si recupera id de veterinario por defecto
    //const veterinarioSeleccionada = this.formulario.get('veterinario')?.value; 

    //console.log("veterinario selected => "+veterinarioSeleccionada);


    if (this.selectedVeterinarioId && this.selectedFecha) {
      this.datosService.obtenerHorarios(this.selectedFecha, this.selectedVeterinarioId).subscribe(
        (data) => {
          console.log(data);
          this.horarios = data;
        },
        (error) => {
          console.error('Error al cargar horarios', error);
        }
      );
    }
  }

onHorarioChange(event: Event): void {
  const selectElement = event.target as HTMLSelectElement; // Casting a HTMLSelectElement
  this.selectedHorario = selectElement.value; // Obtiene el valor seleccionado

  console.log(this.selectedHorario);
}

onVeterinarioChange(event: Event): void {
   
  const fechaSeleccionada = this.formulario.get('fecha')?.value; 

  console.log("fecha actual => "+fechaSeleccionada);

  //setea valor por defecto del campo fecha
  this.selectedFecha = fechaSeleccionada;

  const selectElement = event.target as HTMLSelectElement; // Casting a HTMLSelectElement
  const empId = selectElement.value;

  if (empId) {
      this.selectedVeterinarioId = +empId; // Convertir a número
      this.cargarHorarios(); // Cargar horarios para el veterinario seleccionado
  } else {
      this.selectedVeterinarioId = null;

      // Limpiar horarios y el campo de hora si no hay veterinario seleccionado
      this.horarios = [];
      this.formulario.get('hora')?.reset(); // Limpiar el campo de hora
  }

  // Si deseas guardar el nombre del veterinario seleccionado
  const selectedVet = this.veterinarios.find(vet => vet.empId.toString() === empId);
  if (selectedVet) {
      this.selectedVeterinario = `${selectedVet.empNombre} ${selectedVet.empApellido}`;
      // Aquí puedes usar selectedVeterinario para tu servicio POST
      console.log(this.selectedVeterinario);
  }
}

  /**peticion api rest modificar cita */
  executeModificar(){

    

  

  const formValue = this.formulario.value;

  console.log(this.selectedVeterinarioId);
  console.log(this.selectedFecha);
  console.log(this.selectedHorario);

  //ver id de la cita
  console.log("ID CITA SELECTED " +formValue.id);

  if (this.selectedVeterinarioId && this.selectedFecha && this.selectedHorario) {

    this.fechaHoraFormat =  this.formatFechaHora(this.selectedFecha, this.selectedHorario);

    console.log(this.fechaHoraFormat);

    this.datosService.currentData.subscribe(data =>{
      console.log("usu correlativo: "+data);
      this.codigoUsu = data
    });

  
    /**
    const citaData = {
      empId: this.selectedVeterinarioId,
      ctaEstado:  1,
      ctaFecHora: this.fechaHoraFormat,
      //ctaPropietario: this.selectedVeterinario,

      ctaPropietario:formValue.propietario.toUpperCase(),
      usuCodigo: this.codigoUsu,
      //horario: this.selectedHorario
    };
    */

    const citaData = {
      ctaCodigo:  formValue.id,
      ctaFecHora: this.fechaHoraFormat,
      //ctaPropietario: this.selectedVeterinario,
      ctaHora: this.formatearHora(formValue.hora),
      //ctaHora: formValue.hora,
      ctaPropietario:formValue.propietario.toUpperCase(),
      //horario: this.selectedHorario
      //idEmp
      //empId: this.formulario.get('veterinario')?.value
      empId: this.selectedVeterinarioId
    };

    console.log(JSON.stringify(citaData));

    this.http.post('http://localhost:8081/happyfriends/actualizarCita', citaData, {

        headers: { 'Content-Type': 'application/json' },
        responseType: 'text' as 'json'

      })
      .subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response); 
          /*
          // Aquí puedes agregar más lógica, como mostrar un mensaje de éxito
          this.formulario.reset();
          // Limpia el formulario y restablece los horarios

          //select horarios disponibles se limpia
          this.formulario.get('hora')?.setValue('');

          this.formulario.get('hora')?.setValue(null);
          this.horarios=[];
      
          this.selectedVeterinarioId=null;
          this.selectedFecha='';
            */
      //this.veterinarios= [];
 
      //this.selectedVeterinarioId = 0;
      //this.selectedFecha = ''; // Fecha seleccionada
      //this.selectedHorario = '';
      //this.horarios=[];

          // Verifica el contenido de la respuesta
        if (response === "Horario ocupado, intente con otro horario") {
          // Si el mensaje de respuesta es "Horario ocupado"
          this.procesoMsg('HORARIO OCUPADO, INTENTE CON OTRO HORARIO');
          console.log("Horario ocupado");
        } else {

          // Aquí puedes agregar más lógica, como mostrar un mensaje de éxito
          this.formulario.reset();
          // Limpia el formulario y restablece los horarios

          //select horarios disponibles se limpia
          this.formulario.get('hora')?.setValue('');

          this.formulario.get('hora')?.setValue(null);
          this.horarios=[];
      
          this.selectedVeterinarioId=null;
          this.selectedFecha='';


          // Si la respuesta no es "Horario ocupado", asumimos que el registro fue modificado con éxito
          console.log("Registro modificado con éxito");
          this.procesoMsg('REGISTRO GUARDADO CON EXITO.');
          // Redirigir al formulario de creación de expediente
         this.router.navigate(['/consultar-cita']);
        }

         
          
        },
        (error) => {
          console.error('Error al generar la cita', error);
          // Maneja el error aquí
          this.procesoMsg('ERROR AL GUARDAR EL REGISTRO.');
          // Redirigir al formulario de creación de expediente
         this.router.navigate(['/consultar-cita']);
        }
     
      )
         
  } else {
    console.error('Por favor, complete todos los campos antes de generar la cita.');

    this.procesoMsg('POR FAVOR COMPLETE TODOS LOS CAMPOS OBLIGATORIOS (*).');

  }
  //this.formularioRegistro.reset();





  }

  formatFechaHora(fecha: string, horario: string): string {
    const [year, month, day] = fecha.split('-'); // Supone que fecha está en formato 'YYYY-MM-DD'
    const formattedDate = new Date(`${year}-${month}-${day}T${horario}:00`); // Crea un objeto Date
  
    // Obtén los componentes de la fecha
    const y = formattedDate.getFullYear();
    const m = String(formattedDate.getMonth() + 1).padStart(2, '0'); // Mes de 0 a 11
    const d = String(formattedDate.getDate()).padStart(2, '0');
    const hr = String(formattedDate.getHours()).padStart(2, '0');
    const min = String(formattedDate.getMinutes()).padStart(2, '0');
  
    return `${y}-${m}-${d} ${hr}:${min}:00`; // Retorna el formato 'YYYY-MM-DD HH:mm:ss'
  }

  // Función para dar formato a la hora
  formatearHora(hora: string): string {
    // Asegúrate de que la hora tenga el formato correcto

    console.log('HORA => '+hora);

    const partes = hora.split(':');
    if (partes.length === 2) {
      return `${partes[0]}:${partes[1]}:00`; // Agrega ":00" al final
    }
    return hora; // Devuelve la hora original si no está en el formato esperado
  }

  procesoMsg(msj: string) {
    const snackBarRef = this.snackBar.open(msj, 'Cerrar', {
      duration: 20000,
      panelClass: ['snackbar-confirm'],
      verticalPosition: 'top',
    });
  
  
  }

    // Función que valida solo caracteres alfabéticos y convierte a mayúsculas
    validarTexto(event: KeyboardEvent): void {
      const input = event.target as HTMLInputElement;
      const charCode = event.charCode || event.keyCode;
      const charStr = String.fromCharCode(charCode);
    
      // Permite solo letras (mayúsculas y minúsculas)
      if (!/^[A-Za-z]+$/.test(charStr)) {
        event.preventDefault();  // Si no es una letra, cancela la tecla
      } else {
        input.value = input.value.toUpperCase(); // Convierte a mayúsculas
      }
    }

}
