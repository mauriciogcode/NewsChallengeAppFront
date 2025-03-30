import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { News } from '../models/news.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/News`;
  
  getNews(pageNumber: number = 1, pageSize: number = 10, orderByDescending: boolean = true): Observable<News[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('orderByDescending', orderByDescending.toString());
    
    return this.http.get<News[]>(this.apiUrl, { params })
      .pipe(
        catchError(error => {
          console.error('Error en getNews:', error);
          return throwError(() => error);
        })
      );
  }

  getNewsById(id: number): Observable<News> {
    return this.http.get<News>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error al obtener noticia con ID ${id}:`, error);
          return throwError(() => error);
        })
      );
  }

  createNews(news: Omit<News, 'id' | 'date' | 'isDeleted'>): Observable<number> {
    return this.http.post<number>(this.apiUrl, news)
      .pipe(
        catchError(error => {
          console.error('Error al crear noticia:', error);
          return throwError(() => error);
        })
      );
  }

  updateNews(news: News): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${news.id}`, news)
      .pipe(
        tap(_ => console.log(`Noticia actualizada con ID: ${news.id}`)),
        catchError(error => {
          console.error(`Error al actualizar noticia con ID ${news.id}:`, error);
          return throwError(() => error);
        })
      );
  }

  deleteNews(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(_ => console.log(`Noticia eliminada con ID: ${id}`)),
        catchError(error => {
          console.error(`Error al eliminar noticia con ID ${id}:`, error);
          return throwError(() => error);
        })
      );
  }
}