import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../models/news.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/News`;
  
  getNews(pageNumber: number = 1, pageSize: number = 10): Observable<News[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    
    return this.http.get<News[]>(this.apiUrl, { params });
  }

  getNewsById(id: number): Observable<News> {
    return this.http.get<News>(`${this.apiUrl}/${id}`);
  }

  createNews(news: Omit<News, 'id' | 'date' | 'isDeleted'>): Observable<number> {
    return this.http.post<number>(this.apiUrl, news);
  }

  updateNews(news: News): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${news.id}`, news);
  }

  deleteNews(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}