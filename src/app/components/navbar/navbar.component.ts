import { Component, Input } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, ButtonModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() showEditButtons: boolean = false;
  @Input() newsId: number | null = null;
  
 
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