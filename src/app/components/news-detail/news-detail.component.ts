import { Component, Input } from '@angular/core';
import { News } from '../../models/news.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.scss'
})
export class NewsDetailComponent {
  @Input() news!: News;
}