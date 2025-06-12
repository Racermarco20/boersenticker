import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-ticker-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  template: `
    <div class="h-52">
      <ngx-charts-line-chart
        [results]="chartData"
        [xAxis]="true"
        [yAxis]="true"
        [legend]="false"
        [autoScale]="true"
        [timeline]="true"
        [showXAxisLabel]="true"
        [showYAxisLabel]="true"
        xAxisLabel="Zeit"
        yAxisLabel="Preis (€)"
        class="bg-gray-50 rounded-lg shadow-sm">
      </ngx-charts-line-chart>
    </div>
  `
})
export class TickerChartComponent implements OnChanges {
  @Input() name!: string;
  @Input() price!: number;

  chartData = [{
    name: '',
    series: [] as { name: string, value: number }[]
  }];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['price']) {
      const timestamp = new Date().toLocaleTimeString();

      this.chartData[0].name = this.name;
      this.chartData[0].series.push({name: timestamp, value: this.price});

      if (this.chartData[0].series.length > 20) {
        this.chartData[0].series.shift();
      }

      this.chartData = [...this.chartData];
    }
  }
}
