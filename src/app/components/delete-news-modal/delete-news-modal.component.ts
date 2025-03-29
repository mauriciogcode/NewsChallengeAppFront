import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-delete-news-modal',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  templateUrl: './delete-news-modal.component.html',
  styleUrl: './delete-news-modal.component.scss'
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