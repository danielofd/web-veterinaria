import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//para validar el tamaño de campo temperatura es de tamaño 3
export function asyncTemperatureValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null); // Si no hay valor, no hay error
    }

    return of(control.value).pipe(
      // Simular una llamada asíncrona, por ejemplo, para verificar el valor
      map(value => {
        // Aquí puedes poner tu lógica para validar
        if (value.length > 3) {
          return { maxlength: true };
        }
        return null; // Sin errores
      }),
      catchError(() => of(null)) // Manejar errores en la validación asíncrona
    );
  };
}


export function asyncNombreMascotaValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null); // Si no hay valor, no hay error
      }
  
      return of(control.value).pipe(
        // Simular una llamada asíncrona, por ejemplo, para verificar el valor
        map(value => {
          // Aquí puedes poner tu lógica para validar
          if (value.length > 50) {
            return { maxlength: true };
          }
          return null; // Sin errores
        }),
        catchError(() => of(null)) // Manejar errores en la validación asíncrona
      );
    };
  }

  export function asyncColorValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null); // Si no hay valor, no hay error
      }
  
      return of(control.value).pipe(
        // Simular una llamada asíncrona, por ejemplo, para verificar el valor
        map(value => {
          // Aquí puedes poner tu lógica para validar
          if (value.length > 25) {
            return { maxlength: true };
          }
          return null; // Sin errores
        }),
        catchError(() => of(null)) // Manejar errores en la validación asíncrona
      );
    };
  }

  export function asynPesoValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null); // Si no hay valor, no hay error
      }
  
      return of(control.value).pipe(
        // Simular una llamada asíncrona, por ejemplo, para verificar el valor
        map(value => {
          // Aquí puedes poner tu lógica para validar
          if (value.length > 20) {
            return { maxlength: true };
          }
          return null; // Sin errores
        }),
        catchError(() => of(null)) // Manejar errores en la validación asíncrona
      );
    };
  }

  export function asynTelefonoValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null); // Si no hay valor, no hay error
      }
  
      return of(control.value).pipe(
        // Simular una llamada asíncrona, por ejemplo, para verificar el valor
        map(value => {
          // Aquí puedes poner tu lógica para validar
          if (value.length > 10) {
            return { maxlength: true };
          }
          return null; // Sin errores
        }),
        catchError(() => of(null)) // Manejar errores en la validación asíncrona
      );
    };
  }
