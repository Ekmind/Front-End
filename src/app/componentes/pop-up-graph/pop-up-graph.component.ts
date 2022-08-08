import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ReloadService } from 'src/services/reload/reload.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pop-up-graph',
  templateUrl: './pop-up-graph.component.html',
  styleUrls: ['./pop-up-graph.component.css'],
})
export class PopUpGraphComponent implements OnInit {
  private readonly mainURL = `${environment.apiURL}`;
  private readonly localURL = `${environment.localURL}`;
  session_id: any;

  constructor(private modal: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {}
}
