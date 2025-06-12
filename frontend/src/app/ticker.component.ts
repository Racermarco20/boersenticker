import {Component, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StockSocketService} from './stock-socket.service';
import {AlertComponent} from './alert.component';

@Component({
  selector: 'app-ticker',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit {
  stocks = signal<{ name: string; price: number }[]>([]);
  latestAlert = signal<string | null>(null);

  constructor(private socket: StockSocketService) {
  }

  ngOnInit(): void {
    this.socket.getStockUpdates().subscribe(update => {
      const all = this.stocks();
      const index = all.findIndex(s => s.name === update.name);
      if (index !== -1) {
        all[index].price = update.price;
        this.stocks.set([...all]);
      } else {
        this.stocks.set([...all, update]);
      }
    });

    this.socket.onAlarm().subscribe(alarm => {
      const msg = `🚨 ${alarm.symbol} hat ${alarm.currentPrice} € erreicht (${alarm.direction} ${alarm.threshold} €)`;
      this.latestAlert.set(msg);
      alert(msg);
      setTimeout(() => this.latestAlert.set(null), 5000);
    });
  }
}
