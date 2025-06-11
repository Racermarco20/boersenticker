import {Component, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StockSocketService} from './stock-socket.service';

@Component({
  selector: 'app-ticker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit {
  stocks = signal<{ name: string; price: number }[]>([]);

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
  }
}
