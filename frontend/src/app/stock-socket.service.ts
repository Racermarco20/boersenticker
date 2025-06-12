import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class StockSocketService {
  private socket = new WebSocket('ws://localhost:3000');

  private stockSubject = new Subject<{ name: string; price: number }>();
  private alertSubject = new Subject<any>();

  constructor() {
    this.socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'stock') {
        this.stockSubject.next(msg.data);
      } else if (msg.type === 'alert') {
        this.alertSubject.next(msg.data);
      }
    };
  }

  getStockUpdates() {
    return this.stockSubject.asObservable();
  }

  onAlarm() {
    return this.alertSubject.asObservable();
  }
}
