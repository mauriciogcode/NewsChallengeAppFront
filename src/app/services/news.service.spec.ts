import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NewsService } from './news.service';
import { News } from '../models/news.model';
import { environment } from '../../environments/environment';

describe('NewsService', () => {
  let service: NewsService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/News`;

  // Datos de ejemplo para pruebas
  const mockNews: News[] = [
    {
      id: 1,
      title: 'Noticia 1',
      body: 'Contenido de la noticia 1',
      imageUrl: 'http://example.com/imagen1.jpg',
      author: 'Autor 1',
      date: new Date(),
      isDeleted: false
    },
    {
      id: 2,
      title: 'Noticia 2',
      body: 'Contenido de la noticia 2',
      imageUrl: 'http://example.com/imagen2.jpg',
      author: 'Autor 2',
      date: new Date(),
      isDeleted: false
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsService]
    });

    service = TestBed.inject(NewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getNews', () => {
    it('should return an array of news with default parameters', () => {
      service.getNews().subscribe(news => {
        expect(news).toEqual(mockNews);
      });

      const req = httpMock.expectOne(`${apiUrl}?pageNumber=1&pageSize=10&orderByDescending=true`);
      expect(req.request.method).toBe('GET');
      req.flush(mockNews);
    });

    it('should return an array of news with custom parameters', () => {
      service.getNews(2, 5, false).subscribe(news => {
        expect(news).toEqual(mockNews);
      });

      const req = httpMock.expectOne(`${apiUrl}?pageNumber=2&pageSize=5&orderByDescending=false`);
      expect(req.request.method).toBe('GET');
      req.flush(mockNews);
    });

    it('should handle error', () => {
      const errorMessage = 'Error al obtener noticias';
      spyOn(console, 'error');

      service.getNews().subscribe({
        next: () => fail('Should have failed'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(console.error).toHaveBeenCalled();
        }
      });

      const req = httpMock.expectOne(`${apiUrl}?pageNumber=1&pageSize=10&orderByDescending=true`);
      req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getNewsById', () => {
    it('should return a single news by id', () => {
      const mockSingleNews = mockNews[0];

      service.getNewsById(1).subscribe(news => {
        expect(news).toEqual(mockSingleNews);
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockSingleNews);
    });

    it('should handle error', () => {
      spyOn(console, 'error');

      service.getNewsById(999).subscribe({
        next: () => fail('Should have failed'),
        error: (error) => {
          expect(error.status).toBe(404);
          expect(console.error).toHaveBeenCalled();
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/999`);
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('createNews', () => {
    it('should create a news and return its id', () => {
      const newNewsData = {
        title: 'Nueva noticia',
        body: 'Contenido de la nueva noticia',
        imageUrl: 'http://example.com/nueva-imagen.jpg',
        author: 'Nuevo autor'
      };
      const newId = 3;

      service.createNews(newNewsData).subscribe(id => {
        expect(id).toBe(newId);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newNewsData);
      req.flush(newId);
    });

    it('should handle error', () => {
      const newNewsData = {
        title: 'Nueva noticia',
        body: 'Contenido de la nueva noticia',
        imageUrl: 'http://example.com/nueva-imagen.jpg',
        author: 'Nuevo autor'
      };
      
      spyOn(console, 'error');

      service.createNews(newNewsData).subscribe({
        next: () => fail('Should have failed'),
        error: (error) => {
          expect(error.status).toBe(400);
          expect(console.error).toHaveBeenCalled();
        }
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('updateNews', () => {
    it('should update a news', () => {
      const updatedNews = mockNews[0];
      updatedNews.title = 'Título actualizado';

      service.updateNews(updatedNews).subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne(`${apiUrl}/${updatedNews.id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedNews);
      req.flush(null);
    });

    it('should handle error', () => {
      const updatedNews = mockNews[0];
      spyOn(console, 'error');
      spyOn(console, 'log');

      service.updateNews(updatedNews).subscribe({
        next: () => fail('Should have failed'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(console.error).toHaveBeenCalled();
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/${updatedNews.id}`);
      req.flush('Server error', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('deleteNews', () => {
    it('should delete a news', () => {
      const id = 1;

      service.deleteNews(id).subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne(`${apiUrl}/${id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });

    it('should handle error', () => {
      const id = 999;
      spyOn(console, 'error');
      spyOn(console, 'log');

      service.deleteNews(id).subscribe({
        next: () => fail('Should have failed'),
        error: (error) => {
          expect(error.status).toBe(404);
          expect(console.error).toHaveBeenCalled();
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/${id}`);
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });
});