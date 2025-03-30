// create-news-modal.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-create-news-modal',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    DialogModule, 
    InputTextModule, 
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './create-news-modal.component.html',
  styleUrls: ['./create-news-modal.component.scss']
})
export class CreateNewsModalComponent {
  @Output() close = new EventEmitter<boolean>();
  
  visible: boolean = false;
  loading: boolean = false;
  newsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private newsService: NewsService,
    private messageService: MessageService
  ) {
    this.newsForm = this.fb.group({
      imageUrl: ['', Validators.required],
      author: ['', Validators.required],
      title: ['', Validators.required],
      subtitle: [''],
      body: ['', Validators.required]
    });
  }

  show(): void {
    this.visible = true;
    this.resetForm();
  }

  hide(): void {
    this.visible = false;
    this.close.emit(false);
  }

  resetForm(): void {
    this.newsForm.reset();
    Object.keys(this.newsForm.controls).forEach(key => {
      this.newsForm.get(key)?.setErrors(null);
    });
  }

  onSave(): void {
    if (this.newsForm.valid) {
      this.loading = true;
      const newsData = {
        title: this.newsForm.value.title,
        body: this.newsForm.value.body,
        imageUrl: this.newsForm.value.imageUrl,
        author: this.newsForm.value.author
      };

      this.newsService.createNews(newsData).subscribe({
        next: (id) => {
          this.loading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: `Noticia creada correctamente con ID: ${id}`,
            life: 3000
          });
          setTimeout(() => {
            this.hide();
            this.close.emit(true);
          }, 1500);
        },
        error: (error) => {
          this.loading = false;
          console.error('Error al crear la noticia:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear la noticia. Por favor, intente nuevamente.',
            life: 5000
          });
        }
      });
    } else {
      Object.keys(this.newsForm.controls).forEach(key => {
        this.newsForm.get(key)?.markAsTouched();
      });
      this.messageService.add({
        severity: 'warn',
        summary: 'Formulario incompleto',
        detail: 'Por favor, complete todos los campos requeridos.',
        life: 3000
      });
    }
  }
}