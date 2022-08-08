import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ReloadService } from 'src/services/reload/reload.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pop-up-update',
  templateUrl: './pop-up-update.component.html',
  styleUrls: ['./pop-up-update.component.css'],
})
export class PopUpUpdateComponent implements OnInit {
  private readonly mainURL = `${environment.apiURL}`;
  private readonly localURL = `${environment.localURL}`;
  patient: any;
  patient_id: any;
  patientData = this.formBuilder.group({
    name: undefined,
    last_name: undefined,
    age: undefined,
    gender: undefined,
    email: undefined,
    phone: undefined,
  });
  constructor(
    private http: HttpClient,
    private modal: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    private reloadService: ReloadService
  ) {}

  ngOnInit(): void {
    this.patient_id = sessionStorage.getItem('patient_id');
    this.http
      .get(this.localURL + `api/get/patient/${this.patient_id}`, {
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.patient = res.patient;
      });
  }

  async updatePatient(update: any) {
    await this.http
      .patch(
        this.localURL + `api/update/patient/${this.patient_id}`,
        {
          name: update.name || this.patient.name,
          last_name: update.last_name || this.patient.last_name,
          age: update.age || this.patient.age,
          gender: update.gender || this.patient.gender,
          email: update.email || this.patient.email,
          phone: update.phone || this.patient.phone,
        },
        { withCredentials: true }
      )
      .subscribe();
  }

  closeModal(): void {
    this.modal.closeAll();
    this.reloadService.askForReload(true);
  }
}
