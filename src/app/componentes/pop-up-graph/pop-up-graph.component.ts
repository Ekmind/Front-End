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
  emotional_data = <any>[];

  constructor(private modal: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.session_id = sessionStorage.getItem('session_id');
    this.http
      .get(this.localURL + `api/get/session/${this.session_id}`, {
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.session = res.sesh;
        console.log(this.session.emotional_data.length);
      });
  }
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [16, 15, 20, 30],
        label: 'Neutral',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: false,
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'Happiness',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: false,
      },
      {
        data: [18, 48, 77, 90, 10, 27, 40],
        label: 'Sadness',

        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: false,
      },
    ],
    labels: ['2016', '2017', '2018', '2019', '2020'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {
        min: 0,
        max: 108000,
      },
      'y-axis-0': {
        position: 'left',
      },
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
}
