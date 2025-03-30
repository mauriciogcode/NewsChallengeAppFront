import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NewsDetailComponent } from '../../components/news-detail/news-detail.component';
import { NewsSidebarComponent } from '../../components/news-sidebar/news-sidebar.component';
import { EditNewsModalComponent } from '../../components/edit-news-modal/edit-news-modal.component';
import { DeleteNewsModalComponent } from '../../components/delete-news-modal/delete-news-modal.component';
import { News } from '../../models/news.model';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-news-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent, 
    NewsDetailComponent, 
    NewsSidebarComponent,
    EditNewsModalComponent,
    DeleteNewsModalComponent,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './news-detail-page.component.html',
  styleUrl: './news-detail-page.component.scss'
})
export class NewsDetailPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private newsService = inject(NewsService);
  private messageService = inject(MessageService);
  
  newsId: number = 0;
  currentNews: News | null = null;
  relatedNews: News[] = [];
  
  showEditModal = false;
  showDeleteModal = false;
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.newsId = +params['id'];
      this.loadNewsDetail();
      this.loadRelatedNews();
    });
  }
  
  loadNewsDetail() {
    this.newsService.getNewsById(this.newsId).subscribe({
      next: (news) => {
        this.currentNews = news;
      },
      error: (error) => {
        console.error('Error al cargar la noticia:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la noticia solicitada',
          life: 3000
        });
        this.router.navigate(['/']);
      }
    });
  }
  
  loadRelatedNews() {
    this.newsService.getNews().subscribe({
      next: (news) => {
        this.relatedNews = news
          .filter(item => item.id !== this.newsId)
          .slice(0, 2);
      },
      error: (error) => {
        console.error('Error al cargar noticias relacionadas:', error);
      }
    });
  }
  
  openEditModal() {
    this.showEditModal = true;
  }
  
  openDeleteModal() {
    this.showDeleteModal = true;
  }
  
  updateNews(news: News) {
    const updatedNews = { ...news, id: this.newsId };
    
    this.newsService.updateNews(updatedNews).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Noticia actualizada correctamente',
          life: 3000
        });
        
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (error) => {
        console.error('Error al actualizar la noticia:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar la noticia',
          life: 3000
        });
      }
    });
  }
  
  deleteNews(id: number) {
    this.newsService.deleteNews(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Noticia eliminada correctamente',
          life: 3000
        });
        
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (error) => {
        console.error('Error al eliminar la noticia:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la noticia',
          life: 3000
        });
      }
    });
  }
}