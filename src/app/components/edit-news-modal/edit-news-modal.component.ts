import { Component, EventEmitter, Input, Output } from '@angular/core';
import { News } from '../../models/news.model';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-news-modal',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, InputTextarea, FormsModule],
  templateUrl: './edit-news-modal.component.html',
  styleUrl: './edit-news-modal.component.scss'
})
export class EditNewsModalComponent {
  @Input() visible: boolean = false;
  @Input() news: News | null = null;
  @Input() isNew: boolean = false;
  
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<News>();
  
  editedNews: Partial<News> = {};
  
  ngOnChanges() {
    if (this.news) {
      this.editedNews = { ...this.news };
    } else {
      this.editedNews = {
        title: '',
        body: '',
        imageUrl: '',
        author: ''
      };
    }
  }
  
  hideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
  
  saveNews() {
    this.save.emit(this.editedNews as News);
    this.hideDialog();
  }
}