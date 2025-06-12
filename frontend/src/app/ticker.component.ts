import {Component, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StockSocketService} from './stock-socket.service';
import {AlertComponent} from './alert.component';
import {TickerChartComponent} from './ticker-chart.component';

@Component({
  selector: 'app-ticker',
  standalone: true,
  imports: [CommonModule, TickerChartComponent, AlertComponent],
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit {
  stocks = signal<{ name: string; price: number }[]>([]);
  latestAlert = signal<string | null>(null);

  constructor(private socket: StockSocketService) {
  }

  ngOnInit(): void {
    this.socket.getStockUpdates().subscribe((update: { name: any; price: any; }) => {
      const all = this.stocks();
      const index = all.findIndex(s => s.name === update.name);
      if (index !== -1) {
        all[index].price = update.price;
        this.stocks.set([...all]);
      } else {
        this.stocks.set([...all, update]);
      }
    });

    this.socket.onAlarm().subscribe((alarm: { symbol: any; currentPrice: any; direction: any; threshold: any; }) => {
      const msg = `🚨 ${alarm.symbol} hat ${alarm.currentPrice} € erreicht (${alarm.direction} ${alarm.threshold} €)`;
      this.latestAlert.set(msg);
      alert(msg);
      setTimeout(() => this.latestAlert.set(null), 5000);
    });
  }
}
