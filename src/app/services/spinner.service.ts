import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private _loading: boolean = false;
  private _message: string = 'Cargando...';

  get loading(): boolean {
    return this._loading;
  }

  get message(): string {
    return this._message;
  }

  show(message: string = 'Cargando...'): void {
    this._message = message;
    this._loading = true;
  }

  hide(): void {
    this._loading = false;
  }
}