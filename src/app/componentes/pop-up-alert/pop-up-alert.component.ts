import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ReloadService } from 'src/services/reload/reload.service';
import { ExpedientComponent } from '../expedient/expedient.component';

@Component({
  selector: 'app-pop-up-alert',
  templateUrl: './pop-up-alert.component.html',
  styleUrls: ['./pop-up-alert.component.css'],
})
export class PopUpAlertComponent implements OnInit {
  private readonly mainURL = `${environment.apiURL}`;
  private readonly localURL = `${environment.localURL}`;
  patient_id: any;

  constructor(
    private modal: MatDialog,
    private http: HttpClient,
    private router: Router,
    private reloadService: ReloadService
  ) {}

  ngOnInit(): void {
    this.patient_id = sessionStorage.getItem('patient_id');
  }

  deletePatient() {
    this.http
      .delete(this.mainURL + `api/delete/patient/${this.patient_id}`, {
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.closeModal();
      });
  }

  closeModal() {
    this.modal.closeAll();
    this.reloadService.askForReload(true);
  }
}
