import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NewsSidebarComponent } from '../../components/news-sidebar/news-sidebar.component';
import { NewsCarouselComponent } from '../../components/news-carousel/news-carousel.component';
import { News } from '../../models/news.model';
import { NewsService } from '../../services/news.service';
import { NewsCardPrincipalComponent } from '../../components/news-card-principal/news-card-principal.component';
import { CreateNewsModalComponent } from '../../components/create-news-modal/create-news-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    NewsSidebarComponent,
    NewsCarouselComponent,    
    NewsCardPrincipalComponent,
    CreateNewsModalComponent

],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  @ViewChild(CreateNewsModalComponent) createNewsModal!: CreateNewsModalComponent;

  private newsService = inject(NewsService);
  
  allNews: News[] = [];
  featuredNews: News | null = null;
  sidebarNews: News[] = [];
  carouselNews: News[] = [];
  
  showEditModal = false;
  newNews: Partial<News> = {};
  
  ngOnInit() {
    this.loadNews();
  }
  
  loadNews() {
    this.newsService.getNews().subscribe(news => {
      this.allNews = news;
      
      if (news.length > 0) {
        this.featuredNews = news[0];
        this.sidebarNews = news.slice(1, 4);
        this.carouselNews = news;
      }
    });
  }
  
  openNewNewsModal(): void {
    this.createNewsModal.show();
  }

  onModalClose(refresh: boolean): void {
    if (refresh) {
      this.loadNews();
    }
  }
  
  saveNews(news: News) {
    this.newsService.createNews({
      title: news.title,
      body: news.body,
      imageUrl: news.imageUrl,
      author: news.author
    }).subscribe(() => {
      this.loadNews();
    });
  }
}