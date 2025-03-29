import { Component, Input } from '@angular/core';
import { News } from '../../models/news.model';
import { NewsCardComponent } from '../news-card/news-card.component';

@Component({
  selector: 'app-news-sidebar',
  standalone: true,
  imports: [NewsCardComponent],
  templateUrl: './news-sidebar.component.html',
  styleUrl: './news-sidebar.component.scss'
})
export class NewsSidebarComponent {
  @Input() news: News[] = [];
  @Input() maxItems: number = 3;
}