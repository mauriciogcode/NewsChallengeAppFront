import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NewsDetailComponent } from '../../components/news-detail/news-detail.component';
import { NewsSidebarComponent } from '../../components/news-sidebar/news-sidebar.component';
import { EditNewsModalComponent } from '../../components/edit-news-modal/edit-news-modal.component';
import { DeleteNewsModalComponent } from '../../components/delete-news-modal/delete-news-modal.component';
import { News } from '../../models/news.model';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-detail-page',
  standalone: true,
  imports: [
    NavbarComponent, 
    NewsDetailComponent, 
    NewsSidebarComponent,
    EditNewsModalComponent,
    DeleteNewsModalComponent
  ],
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
      error: () => {
        this.router.navigate(['/']);
      }
    });
  }
  
  loadRelatedNews() {
    this.newsService.getNews().subscribe(news => {
      // Exclude current news and limit to 2 items
      this.relatedNews = news
        .filter(item => item.id !== this.newsId)
        .slice(0, 2);
    });
  }
  
  openEditModal() {
    this.showEditModal = true;
  }
  
  openDeleteModal() {
    this.showDeleteModal = true;
  }
  
  updateNews(news: News) {
    this.newsService.updateNews(news).subscribe(() => {
      this.loadNewsDetail();
    });
  }
  
  deleteNews(id: number) {
    this.newsService.deleteNews(id).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}