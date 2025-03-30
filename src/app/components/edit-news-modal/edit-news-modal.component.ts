import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { News } from '../../models/news.model';
import { ToastService } from '../../services/toast.service';
import { SpinnerService } from '../../services/spinner.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';


@Component({
  selector: 'app-edit-news-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    SpinnerComponent
  ],
  templateUrl: './edit-news-modal.component.html',
  styleUrls: ['./edit-news-modal.component.scss']
})
export class EditNewsModalComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() news: News | null = null;
  
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<News>();
  
  newsForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    public spinnerService: SpinnerService
  ) {
    this.newsForm = this.fb.group({
      imageUrl: ['', Validators.required],
      author: ['', Validators.required],
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }
  
  ngOnChanges() {
    if (this.news && this.visible) {
      this.newsForm.patchValue({
        title: this.news.title || '',
        author: this.news.author || '',
        imageUrl: this.news.imageUrl || '',
        body: this.news.body || ''
      });
    }
  }
  
  hide() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
  
  onSave() {
    if (this.newsForm.valid && this.news) {
      this.spinnerService.show('Actualizando noticia...');
      
      const updatedNews: News = {
        id: this.news.id,
        title: this.newsForm.value.title,
        body: this.newsForm.value.body,
        imageUrl: this.newsForm.value.imageUrl,
        author: this.newsForm.value.author,
        date: this.news.date,
        isDeleted: this.news.isDeleted
      };
      
      setTimeout(() => {
        this.spinnerService.hide();
        this.hide();
        this.save.emit(updatedNews);
      }, 1000);
      
    } else {
      Object.keys(this.newsForm.controls).forEach(key => {
        this.newsForm.get(key)?.markAsTouched();
      });
      this.toastService.warning(
        'Formulario incompleto',
        'Por favor, complete todos los campos requeridos.',
        3000
      );
    }
  }
}