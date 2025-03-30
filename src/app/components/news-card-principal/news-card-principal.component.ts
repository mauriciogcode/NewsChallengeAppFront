import { Component, Input } from '@angular/core';
import { News } from '../../models/news.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-news-card-principal',
  standalone: true,
  imports: [CardModule, ButtonModule, DatePipe],
  templateUrl: './news-card-principal.component.html',
  styleUrl: './news-card-principal.component.scss'
})
export class NewsCardPrincipalComponent {
  @Input() news!: News;
  @Input() isMainCard: boolean = false;
  
  constructor(private router: Router) {}
  
  navigateToDetail() {
    this.router.navigate(['/news', this.news.id]);
  }
  
  getSummary(text: string, length: number): string {
    return text.length > length ? text.substring(0, length) + '...' : text;
  }
}