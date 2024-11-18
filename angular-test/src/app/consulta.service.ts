import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private consultaSubject = new BehaviorSubject<any>(null);
  consulta$ = this.consultaSubject.asObservable();

  setConsulta(consulta: any) {
    this.consultaSubject.next(consulta);
  }

  getConsulta() {
    return this.consultaSubject.value;
  }


}
