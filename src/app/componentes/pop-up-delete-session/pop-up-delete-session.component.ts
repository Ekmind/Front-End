import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ReloadService } from 'src/services/reload/reload.service';

@Component({
  selector: 'app-pop-up-delete-session',
  templateUrl: './pop-up-delete-session.component.html',
  styleUrls: ['./pop-up-delete-session.component.css'],
})
export class PopUpDeleteSessionComponent implements OnInit {
  private readonly mainURL = `${environment.apiURL}`;
  private readonly localURL = `${environment.localURL}`;

  session_id: any;

  constructor(
    private http: HttpClient,
    private modal: MatDialog,
    private reloadService: ReloadService
  ) {}

  ngOnInit(): void {}

  deleteSession() {
    this.session_id = sessionStorage.getItem('session_id');
    this.http
      .delete(this.mainURL + `api/delete/appointment/${this.session_id}`, {
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.reloadService.askForReload(true);
        console.log(res);
        this.closeModal();
      });
  }

  closeModal() {
    this.modal.closeAll();
    sessionStorage.removeItem('session_id');
  }
}
