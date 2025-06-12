import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {
  symbol: string = '';
  threshold: number = 0;
  direction: string = 'above';
  alerts: any[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadAlerts();
  }

  createAlert() {
    const payload = {
      userId: 'test-user',
      symbol: this.symbol,
      threshold: this.threshold,
      direction: this.direction
    };

    this.http.post('http://localhost:3000/api/alerts', payload).subscribe({
      next: () => {
        alert('Preisalarm erstellt!');
        this.loadAlerts();
      },
      error: err => alert('Fehler beim Erstellen: ' + err.message)
    });
  }

  loadAlerts() {
    this.http.get<any[]>('http://localhost:3000/api/alerts').subscribe({
      next: data => this.alerts = data,
      error: err => console.error('Fehler beim Laden der Alarme:', err)
    });
  }

  deleteAlert(alert: any) {
    const url = `http://localhost:3000/api/alerts/${alert.symbol}/${alert.threshold}/${alert.direction}`;
    this.http.delete(url).subscribe({
      next: () => this.loadAlerts(),
      error: err => alert('Fehler beim Löschen: ' + err.message)
    });
  }
}
