import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

    // Subject que emitirá la visibilidad del modal
    private openModalSubject = new Subject<boolean>();
    // Observable para que otros componentes se suscriban y reaccionen
    public openModal$ = this.openModalSubject.asObservable();
  
    constructor() { }
  
    // Método para abrir el modal
    openModal() {
      this.openModalSubject.next(true);
    }
  
    // Método para cerrar el modal
    closeModal() {
      this.openModalSubject.next(false);
    }
}
