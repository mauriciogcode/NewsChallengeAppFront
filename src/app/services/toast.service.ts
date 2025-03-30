import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  success(summary: string, detail: string, timeout: number = 3000): void {
    this.messageService.add({
      severity: 'success',
      summary: summary,
      detail: detail,
      life: timeout
    });
  }

  error(summary: string, detail: string, timeout: number = 5000): void {
    this.messageService.add({
      severity: 'error',
      summary: summary,
      detail: detail,
      life: timeout
    });
  }

  warning(summary: string, detail: string, timeout: number = 3000): void {
    this.messageService.add({
      severity: 'warn',
      summary: summary,
      detail: detail,
      life: timeout
    });
  }

  info(summary: string, detail: string, timeout: number = 3000): void {
    this.messageService.add({
      severity: 'info',
      summary: summary,
      detail: detail,
      life: timeout
    });
  }
}