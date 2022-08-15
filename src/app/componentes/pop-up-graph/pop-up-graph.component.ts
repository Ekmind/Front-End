import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ReloadService } from 'src/services/reload/reload.service';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pop-up-graph',
  templateUrl: './pop-up-graph.component.html',
  styleUrls: ['./pop-up-graph.component.css'],
})
export class PopUpGraphComponent implements OnInit {
  private readonly mainURL = `${environment.apiURL}`;
  private readonly localURL = `${environment.localURL}`;
  session_id: any;
  session = <any>[];
  sliderValue = 1;
  emotions = <any>Promise;
  dominantEmotion: any;
  dominantEmotionShowCase: any;
  max: any;
  currentData = <any>[];
  data = {
    name: 'Emotions',
    series: [
      { name: 'Happiness', value: 50 },
      { name: 'Surprise', value: 20 },
      { name: 'Anger', value: 20 },
      { name: 'Disgust', value: 10 },
      { name: 'Fear', value: 15 },
      { name: 'Neutral', value: 20 },
    ],
  };
  view = [700, 400];

  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  legendTitle: string = 'Years';

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA'],
  };

  constructor(private modal: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.session_id = sessionStorage.getItem('session_id');
    this.http
      .get(this.localURL + `api/get/session/${this.session_id}`, {
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.session = res.sesh;
        this.dominantEmotion = this.session.emotional_data.map(
          (data: any) => data.dominantEmotion
        );
        this.emotions = this.session.emotional_data.map(
          (data: any) => data.emotion
        );
        this.currentData = this.emotions[0];
        this.max = this.session.emotional_data.length;
        console.log({ 'Map of dominant emotions': this.dominantEmotion });
        console.log({ 'Map of emotions': this.emotions });
        // console.log(this.session.emotional_data);
      });
    // console.log(this.lineChartData.datasets[0].data);
  }

  sliderData(event) {
    this.sliderValue = event.value;
    this.currentData = this.emotions[this.sliderValue];
    this.dominantEmotionShowCase = this.dominantEmotion[this.sliderValue];

    this.lineChartData.datasets[0].data[0] = this.currentData.Happy * 100;
    this.lineChartData.datasets[0].data[1] = this.currentData.Sad * 100;
    this.lineChartData.datasets[0].data[2] = this.currentData.Disgust * 100;
    this.lineChartData.datasets[0].data[3] = this.currentData.Angry * 100;
    this.lineChartData.datasets[0].data[4] = this.currentData.Fear * 100;
    this.lineChartData.datasets[0].data[5] = this.currentData.Surprise * 100;
    this.lineChartData.datasets[0].data[6] = this.currentData.Neutral * 100;
    this.chart?.update();
    // console.log(this.lineChartData.datasets[0].data);
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        label: '',
        data: [20, 20, 20, 20, 20, 20, 20],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(201, 203, 207, 1)',
        ],
        hoverBorderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(201, 203, 207, 1)',
        ],
        borderWidth: 1,
      },
    ],
    labels: [
      'Happiness',
      'Sadness',
      'Disgust',
      'Anger',
      'Fear',
      'Surprise',
      'Neutral',
    ],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {
        min: 0,
        max: 8,
      },
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  public lineChartType: ChartType = 'bar';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
}
