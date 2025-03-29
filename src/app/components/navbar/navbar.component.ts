import { Component, Input } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() showEditButtons: boolean = false;
  @Input() newsId: number | null = null;
  
  items: MenuItem[] = [
    {
      label: 'MFNews',
      routerLink: '/'
    }
  ];
  
  constructor(private router: Router) {}
  
  navigateToHome() {
    this.router.navigate(['/']);
  }
  
  openNewNewsModal() {
  }
  
  openEditModal() {
  }
  
  openDeleteModal() {
  }
}