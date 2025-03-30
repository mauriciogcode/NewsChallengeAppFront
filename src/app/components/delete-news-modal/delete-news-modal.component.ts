import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-delete-news-modal',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  template: `
    <p-dialog 
      [(visible)]="visible" 
      [style]="{ width: '30vw' }" 
      [modal]="true" 
      [draggable]="false" 
      [resizable]="false"
      header="Confirmar eliminación">
      
      <div class="confirmation-content">
        <p>¿Estás seguro de que quieres eliminar esta noticia? Esta acción no se puede deshacer.</p>
      </div>
      
      <ng-template pTemplate="footer">
        <button pButton label="No" icon="pi pi-times" (click)="hideDialog()" class="p-button-text"></button>
        <button pButton label="Sí" icon="pi pi-check" (click)="confirmDelete()" class="p-button-danger"></button>
      </ng-template>
    </p-dialog>
  `,
  styles: [`
    .confirmation-content {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 0;
    }
  `]
})
export class DeleteNewsModalComponent {
  @Input() visible: boolean = false;
  @Input() newsId: number | null = null;
  
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<number>();
  
  hideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
  
  confirmDelete() {
    if (this.newsId !== null) {
      this.confirm.emit(this.newsId);
    }
    this.hideDialog();
  }
}