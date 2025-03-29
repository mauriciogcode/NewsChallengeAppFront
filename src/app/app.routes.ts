import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewsDetailPageComponent } from './pages/news-detail-page/news-detail-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'news/:id', component: NewsDetailPageComponent },
  { path: '**', redirectTo: '' }
];