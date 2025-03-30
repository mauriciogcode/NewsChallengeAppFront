import { Component, Input, OnInit } from '@angular/core';
import { News } from '../../models/news.model';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-carousel',
  standalone: true,
  imports: [CarouselModule, ButtonModule, DatePipe],
  templateUrl: './news-carousel.component.html',
  styleUrl: './news-carousel.component.scss'
})
export class NewsCarouselComponent implements OnInit {
  @Input() news: News[] = [];
  currentPage: number = 1;
  totalNews: number = 0;
  pageSize: number = 10;

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(private router: Router, private newsService: NewsService) {}

  ngOnInit() {
    this.loadNews({ first: 0 }); 
  }

  navigateToDetail(id: number) {
    this.router.navigate(['/news', id]);
  }

  loadNews(event: any) {
    const pageNumber = Math.floor(event.first / this.pageSize) + 1;
    this.newsService.getNews(pageNumber, this.pageSize).subscribe((data) => {
      if (event.first === 0) {
        this.news = data; 
      } else {
        this.news = [...this.news, ...data];
      }
    });
  }
}
