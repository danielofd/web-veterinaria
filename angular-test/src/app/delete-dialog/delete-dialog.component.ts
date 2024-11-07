import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {

  // Esta propiedad contendrá el texto a mostrar dinámicamente
  message: string;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Usamos MAT_DIALOG_DATA para recibir los datos del diálogo
  ) {
     // Aquí asignamos el texto recibido
     this.message = data.message; // Asumimos que el objeto 'data' tiene una propiedad 'message'
  }

  onCancel(): void {
    this.dialogRef.close(false); // Cerrar y devolver false
  }

  onConfirm(): void {
    this.dialogRef.close(true); // Cerrar y devolver true
  }

}
