import { Component, Input } from '@angular/core';
import { News } from '../../models/news.model';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-news-carousel',
  standalone: true,
  imports: [CarouselModule, ButtonModule, DatePipe],
  templateUrl: './news-carousel.component.html',
  styleUrl: './news-carousel.component.scss'
})
export class NewsCarouselComponent {
  @Input() news: News[] = [];
  
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];
  
  constructor(private router: Router) {}
  
  navigateToDetail(id: number) {
    this.router.navigate(['/news', id]);
  }
}