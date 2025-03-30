import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { News } from '../../models/news.model';

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
  ],
  template: `
    <p-dialog 
      [(visible)]="visible" 
      [style]="{ width: '50vw' }" 
      [modal]="true" 
      [draggable]="false" 
      [resizable]="false"
      [closeOnEscape]="true"
      [header]="isNew ? 'Crear Noticia' : 'Editar Noticia'">
      
      <div class="form-container p-fluid">
        <form [formGroup]="newsForm">
          <div class="field">
            <label for="title">Título</label>
            <input type="text" pInputText id="title" formControlName="title" class="w-full">
            <small *ngIf="newsForm.get('title')?.invalid && newsForm.get('title')?.touched" class="p-error">
              Este campo es requerido
            </small>
          </div>
          
          <div class="field">
            <label for="author">Autor</label>
            <input type="text" pInputText id="author" formControlName="author" class="w-full">
            <small *ngIf="newsForm.get('author')?.invalid && newsForm.get('author')?.touched" class="p-error">
              Este campo es requerido
            </small>
          </div>
          
          <div class="field">
            <label for="imageUrl">URL de la imagen</label>
            <input type="text" pInputText id="imageUrl" formControlName="imageUrl" class="w-full">
            <small *ngIf="newsForm.get('imageUrl')?.invalid && newsForm.get('imageUrl')?.touched" class="p-error">
              Este campo es requerido
            </small>
          </div>
          
          <div class="field">
            <label for="body">Contenido</label>
            <textarea pInputTextarea id="body" formControlName="body" rows="5" class="w-full"></textarea>
            <small *ngIf="newsForm.get('body')?.invalid && newsForm.get('body')?.touched" class="p-error">
              Este campo es requerido
            </small>
          </div>
        </form>
      </div>
      
      <ng-template pTemplate="footer">
        <button pButton label="Cancelar" icon="pi pi-times" (click)="hideDialog()" class="p-button-text"></button>
        <button pButton label="Guardar" icon="pi pi-check" (click)="saveNews()" [disabled]="newsForm.invalid"></button>
      </ng-template>
    </p-dialog>
  `,
  styles: [`
    .form-container {
      padding: 1rem;
    }
    
    .field {
      margin-bottom: 1.5rem;
    }
  `]
})
export class EditNewsModalComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() news: News | null = null;
  @Input() isNew: boolean = false;
  
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<News>();
  
  newsForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.newsForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      imageUrl: ['', Validators.required],
      body: ['', Validators.required]
    });
  }
  
  ngOnChanges() {
    if (this.news && this.visible) {
      this.newsForm.patchValue({
        title: this.news['title'] || '',
        author: this.news['author'] || '',
        imageUrl: this.news['imageUrl'] || '',
        body: this.news['body'] || ''
      });
    } else if (this.isNew) {
      this.newsForm.reset();
    }
  }
  
  hideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
  
  saveNews() {
    if (this.newsForm.valid) {
      const updatedNews: News = {
        ...this.news,
        ...this.newsForm.value
      };
      
      this.save.emit(updatedNews);
    } else {
      Object.keys(this.newsForm.controls).forEach(key => {
        const control = this.newsForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}