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
import { ToastService } from '../../services/toast.service';


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
    
  ],
  providers: [],
  templateUrl: './news-detail-page.component.html',
  styleUrl: './news-detail-page.component.scss'
})
export class NewsDetailPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private newsService = inject(NewsService);
  
  
  newsId: number = 0;
  currentNews: News | null = null;
  relatedNews: News[] = [];
  
  showEditModal = false;
  showDeleteModal = false;

  constructor(
    private toastService: ToastService
  ) {}
  
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
        this.toastService.error('Error', 'No se pudo cargar la noticia solicitada', 3000);

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
        this.toastService.success('Éxito', 'Noticia actualizada correctamente', 3000);
      },
      error: (error) => {
        console.error('Error al actualizar la noticia:', error);
        this.toastService.error('Error', 'No se pudo actualizar la noticia', 3000);
      }
    });
  }
  
  deleteNews(id: number) {
    this.newsService.deleteNews(id).subscribe({
      next: () => {
        this.toastService.success('Éxito', 'Noticia eliminada correctamente', 3000);

        
      
        
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (error) => {
        console.error('Error al eliminar la noticia:', error);
        this.toastService.error('Error', 'No se pudo eliminar la noticia', 3000);
      }
    });
  }
}