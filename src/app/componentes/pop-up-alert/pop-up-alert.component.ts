import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private modal: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.patient_id = sessionStorage.getItem('patient_id');
  }

  deletePatient() {
    this.http
      .delete(this.localURL + `api/delete/patient/${this.patient_id}`, {
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.closeModal();
        document.location.reload();
      });
  }

  closeModal() {
    this.modal.closeAll();
  }
}
