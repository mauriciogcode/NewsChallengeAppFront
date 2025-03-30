import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NewsService } from '../../services/news.service';
import { ToastService } from '../../services/toast.service';
import { SpinnerService } from '../../services/spinner.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { catchError, concatMap, finalize, of, tap } from 'rxjs';

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
    SpinnerComponent
  ],
  templateUrl: './create-news-modal.component.html',
  styleUrls: ['./create-news-modal.component.scss']
})
export class CreateNewsModalComponent {
  @Output() close = new EventEmitter<boolean>();
  
  visible: boolean = false;
  newsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private newsService: NewsService,
    private toastService: ToastService,
    public spinnerService: SpinnerService
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

  async onSave(): Promise<void> {
    if (this.newsForm.valid) {
      this.spinnerService.show('Creando noticia...');
      const newsData = {
        title: this.newsForm.value.title,
        body: this.newsForm.value.body,
        imageUrl: this.newsForm.value.imageUrl,
        author: this.newsForm.value.author
      };
  
      this.newsService.createNews(newsData).pipe(
        concatMap(() => {
          return of(this.showSuccessToast());
        }),
        tap(() => {
          this.spinnerService.hide(); 
        }),
        finalize(() => {
          setTimeout(() => {
            this.hide();
            this.close.emit(true);
          }, 1000);
        }),
        catchError((error) => {
          console.error('Error al crear la noticia:', error);
          this.toastService.error(
            'Error',
            'No se pudo crear la noticia. Por favor, intente nuevamente.',
            5000
          );
          this.spinnerService.hide(); 
          return of(null); 
        })
      ).subscribe();
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
  
  private showSuccessToast(): void {
    this.toastService.success(
      'Éxito',
      `Noticia creada correctamente.`,
      3000
    );
  }
  
}