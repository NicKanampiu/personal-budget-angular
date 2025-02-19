import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(PieController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'pb-homepage',
  standalone: false,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit, OnDestroy {

  public dataSource = {
    datasets: [
      {
        data: [] as number[],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          '#23d160',
          '#ff3860',
          '#f1f1f1',
          '#4bc0c0',
          '#a7b1c2',
          '#d7dcdf',
          '#f1c40f',
          '#e74c3c',
          '#34495e'
        ],
      }
    ],
    labels: [] as string[]
  };

  private myPieChart: Chart | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
      .subscribe((res: any) => {
        for (var i = 0; i < res.myBudget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.myBudget[i].title;
        }
        this.createChart();
      }, (error) => {
        console.error('Error loading budget data', error);
      });
  }

  createChart(): void {
    var canvas = document.getElementById('myChart') as HTMLCanvasElement;
    if (canvas) {
      var ctx = canvas.getContext('2d');
      if (ctx) {
        if (this.myPieChart) {
          this.myPieChart.destroy(); // Destroy the existing chart instance
        }
        this.myPieChart = new Chart(ctx, {
          type: 'pie',
          data: this.dataSource
        });
      } else {
        console.error('Failed to get 2D context');
      }
    } else {
      console.error('Canvas element not found');
    }
  }

  ngOnDestroy(): void {
    if (this.myPieChart) {
      this.myPieChart.destroy(); // Destroy the chart instance when the component is destroyed
    }
  }
}
