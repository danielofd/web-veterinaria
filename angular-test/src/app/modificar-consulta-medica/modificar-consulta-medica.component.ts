import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConsultaService } from '../consulta.service';
import { DatosService } from '../service/datos.service';

@Component({
  selector: 'app-modificar-consulta-medica',
  templateUrl: './modificar-consulta-medica.component.html',
  styleUrls: ['./modificar-consulta-medica.component.css']
})
export class ModificarConsultaMedicaComponent implements OnInit {

  //variables flag
  // Variables para controlar el enfoque de los campos
  isSintomasFocused: boolean = false;
  isDiagnosticoFocused: boolean = false;
  isExamenesFocused: boolean = false;
  isObservacionesFocused: boolean = false;

  validationMessage: string="";
  consultaForm: FormGroup;



  constructor(private consultaService: ConsultaService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private datosService: DatosService,
  ) {
      // Inicializar el formulario con validaciones
    this.consultaForm = this.fb.group({
      masPeso: ['', [Validators.required, Validators.pattern('^[0-9]{1,3}(\.[0-9]{1,2})?$')]],  // Peso obligatorio y solo números
      masTemperatura: ['', [Validators.required, Validators.pattern('^[0-9]{1,3}(\.[0-9]{1,2})?$')]],  // Temperatura con decimales
      masFreCardiaca: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],  // Frecuencia cardiaca
      conSintomas: ['', Validators.required],  // Sintomas obligatorio
      conDiagnostico: ['', Validators.required],  // Diagnóstico obligatorio
      conExamenes: ['', Validators.required],  // Exámenes recomendados obligatorios
      conObservaciones: ['']  // Observaciones obligatorias
    });
    
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // Método para guardar la consulta modificada
  saveConsulta() {

    //event.preventDefault(); // Previene el comportamiento predeterminado de submit

    if (this.consultaForm.valid) {
      // Aquí puedes procesar los datos del formulario
      //this.save.emit(this.consulta); // Emitimos la consulta modificada
      console.log(this.consultaForm.value);

      // Obtenemos los valores del formulario
      const formValues = this.consultaForm.value;

      const dataReq ={
        //conId: this.consulta.conId,
        conSintomas: formValues.conSintomas,
        conDiagnostico: formValues.conDiagnostico,
        conExamenes: formValues.conExamenes,
        conObservaciones: formValues.conObservaciones,
        conPeso: formValues.masPeso,
        conTemperatura: formValues.masTemperatura,
        conFrecardiaca: formValues.masFreCardiaca,
        //usuCodigo: this.usuCod,
      };

      console.log("------------");
      console.log(dataReq);
      
    } else {
      console.log("Formulario inválido");
    }


  

    //this.consultaService.setConsulta(this.consulta);

    //this.closeModal(); // Cerramos el modal
  }

  validateDecimalInput(event: KeyboardEvent) {
    const inputValue = event.target as HTMLInputElement;
    const value = inputValue.value;
    const charCode = event.charCode;

    // Permitir solo números, punto decimal y restricciones de 3 enteros y 2 decimales
    const regex = /^\d{0,3}(\.\d{0,2})?$/;

    // Si la tecla presionada no es un número ni un punto, prevenir la entrada
    if (
      (charCode < 48 || charCode > 57) && // No es un número
      charCode !== 46 // No es el punto decimal
    ) {
      event.preventDefault();
      return;
    }

    // Validar si el valor sigue el patrón deseado
    if (!regex.test(value + String.fromCharCode(charCode))) {
      event.preventDefault(); // Si el valor excede el formato permitido, prevenir la entrada
    }
    }


      // Validación para permitir solo números enteros
  validateIntegerInput(event: KeyboardEvent) {
    const charCode = event.charCode;

    // Permitir solo números (códigos ASCII 48-57 para números 0-9)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault(); // Si el carácter no es un número, se previene la entrada
    }
  }



  // Función genérica para manejar el evento keypress
  validateInput(event: KeyboardEvent, validationType: string) {
    const charCode = event.charCode;

    // Validación dependiendo del tipo de entrada
    switch (validationType) {
      case 'alfanumerico':
        // Permitir letras (A-Z, a-z), números (0-9) y espacios
        if (
          (charCode < 48 || charCode > 57) &&  // No es un número (0-9)
          (charCode < 65 || charCode > 90) &&  // No es una letra mayúscula (A-Z)
          (charCode < 97 || charCode > 122) && // No es una letra minúscula (a-z)
          charCode !== 32                    // No es un espacio
        ) {
          event.preventDefault(); // Si no es alfanumérico o espacio, prevenir la entrada
        }
        break;

      case 'numerico':
        // Permitir solo números
        if (charCode < 48 || charCode > 57) {
          event.preventDefault(); // Si no es un número, prevenir la entrada
        }
        break;

      case 'texto':
        // Permitir solo letras (A-Z, a-z)
        if (
          (charCode < 65 || charCode > 90) &&  // No es una letra mayúscula
          (charCode < 97 || charCode > 122)    // No es una letra minúscula
        ) {
          event.preventDefault(); // Si no es una letra, prevenir la entrada
        }
        break;

      default:
        break;
    }
  }

  //-------
            // Función genérica para manejar el evento onFocus
  onFocus(validationType: string) {
    // Dependiendo del tipo de validación, mostramos un mensaje apropiado
    // switch (validationType) {
    //   case 'alfanumerico':
    //     this.validationMessage = 'Solo se permiten caracteres alfanuméricos (letras y números).';
    //     break;
    //   case 'numerico':
    //     this.validationMessage = 'Solo se permiten números.';
    //     break;
    //   case 'texto':
    //     this.validationMessage = 'Solo se permiten letras.';
    //     break;
    //   default:
    //     this.validationMessage = '';
    //     break;
    // }

    // Manejo específico de los campos relacionados con síntomas, diagnóstico, exámenes y observaciones
    if (validationType === 'sintomas') {
      this.isSintomasFocused = true;  // Marca el campo como enfocado
    } else if (validationType === 'diagnostico') {
      this.isDiagnosticoFocused = true;  // Marca el campo como enfocado
    } else if (validationType === 'examenes') {
      this.isExamenesFocused = true;  // Marca el campo como enfocado
    } else if (validationType === 'observaciones') {
      this.isObservacionesFocused = true;  // Marca el campo como enfocado
    }
  }

  //------

          // Función para manejar el evento onBlur (cuando el campo pierde el enfoque)
  onBlur(validationType: string) {
    // Restablece el estado de enfoque cuando el campo pierde el foco
    switch (validationType) {
      case 'sintomas':
        this.isSintomasFocused = false;
        break;
      case 'diagnostico':
        this.isDiagnosticoFocused = false;
        break;
      case 'examenes':
        this.isExamenesFocused = false;
        break;
      case 'observaciones':
        this.isObservacionesFocused = false;
        break;
    }

    // Opcionalmente, puedes borrar el mensaje de validación cuando se pierde el enfoque
    this.validationMessage = '';
  }

  //-----
  regresar() {
    this.router.navigate(['/ver-historial-medico']);
    }

//fin de codigo.

}
