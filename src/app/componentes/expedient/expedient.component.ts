import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { Doctor } from 'src/app/interfaces/doctor.interface';
import { Patients } from 'src/app/interfaces/patients.interface';
import { environment } from 'src/environments/environment';
import { ManagementService } from 'src/services/patients/management.service';
import { FormBuilder } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { Subscription } from 'rxjs';
import { ReloadService } from 'src/services/reload/reload.service';

@Component({
  selector: 'app-expedient',
  templateUrl: './expedient.component.html',
  styleUrls: ['./expedient.component.css'],
})
export class ExpedientComponent implements OnInit {
  private readonly mainURL = `${environment.apiURL}`;
  private readonly localURL = `${environment.localURL}`;
  user: Doctor | any;
  patients: Patients | any;
  patientData = this.formBuilder.group({
    name: '',
    last_name: '',
    age: '',
    gender: '',
    email: '',
  });

  reloadCommand: any;
  private subscriptionName: Subscription;

  constructor(
    private router: Router,
    private http: HttpClient,
    private app: AppComponent,
    private formBuilder: FormBuilder,
    private patientManagement: ManagementService,
    private reloadService: ReloadService
  ) {
    this.subscriptionName = this.reloadService
      .reload()
      .subscribe((res: any) => {
        if (res.reload === true) {
          return this.getUser();
        }
        return;
      });
  }

  ngOnInit(): void {
    this.getUser();
  }

  async getUser() {
    await this.http
      .get(this.localURL + 'api/login', { withCredentials: true })
      .subscribe((res: any) => {
        this.user = res.user;
        this.list(this.user._id);
      });
  }

  async list(user_id: any) {
    // await console.log({ user_id: user_id });
    await this.http
      .get(this.localURL + `api/get/all/patients/${user_id}`, {
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.patients = res.patients;
      });
  }

  getPatient(patient_id: any) {
    console.log({ patient_id: patient_id });
    this.http
      .get(this.localURL + `api/get/patient/${patient_id}`, {
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.patientManagement.patient = res.patient;
        this.router.navigate(['/patient-profile']);
      });
  }

  submitPatient(user_id: any, patient: any) {
    console.log({ user: user_id, patient: patient });
    this.http
      .post(this.localURL + `api/insert/patient/${user_id}`, patient, {
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.getUser();
      });
  }

  openUpdateModal(patient_id: any) {
    this.app.openPatientUpdate();
    sessionStorage.setItem('patient_id', patient_id);
  }

  openAlertModal(patient_id: any) {
    this.app.openAlert();
    sessionStorage.setItem('patient_id', patient_id);
  }
}
