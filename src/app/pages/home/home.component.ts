import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NewsSidebarComponent } from '../../components/news-sidebar/news-sidebar.component';
import { NewsCarouselComponent } from '../../components/news-carousel/news-carousel.component';
import { News } from '../../models/news.model';
import { NewsService } from '../../services/news.service';
import { NewsCardPrincipalComponent } from '../../components/news-card-principal/news-card-principal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    NewsSidebarComponent,
    NewsCarouselComponent,    
    NewsCardPrincipalComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
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
        const sortedNews = [...news].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        this.featuredNews = sortedNews[0];
        
        this.sidebarNews = sortedNews.slice(1, 4);
        
        this.carouselNews = sortedNews;
      }
    });
  }
  
  openNewNewsModal() {
    this.newNews = {};
    this.showEditModal = true;
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