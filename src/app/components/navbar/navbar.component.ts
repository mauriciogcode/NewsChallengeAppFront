import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() newNewsClick = new EventEmitter<void>();
  @Output() editClick = new EventEmitter<void>();
  @Output() deleteClick = new EventEmitter<void>();
  
  @Input() showEditButtons: boolean = false;
  @Input() newsId: number | null = null;
  
  constructor(private router: Router) {}
  
  navigateToHome() {
    this.router.navigate(['/']);
  }
  
  onNewNewsClick(): void {
    this.newNewsClick.emit();
  }
  
  openEditModal() {
    this.editClick.emit();
  }
  
  openDeleteModal() {
    this.deleteClick.emit();
  }
}