import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

export interface StockUpdate {
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class StockSocketService {
  private socket$: WebSocketSubject<StockUpdate>;

  constructor() {
    this.socket$ = webSocket('ws://localhost:3000'); // oder Server-IP
  }

  getStockUpdates(): Observable<StockUpdate> {
    return this.socket$.asObservable();
  }
}
