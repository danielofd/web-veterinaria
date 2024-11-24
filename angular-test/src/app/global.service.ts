import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }


  //para almacenar el codigo del usuario
  private dataSource = new BehaviorSubject<any>(null);

  currentData = this.dataSource.asObservable();

  //metodo para update value
  changeData(data: any){

    console.log("--->recibe parametros: "+data)

    this.dataSource.next(data);

    
  }


}
