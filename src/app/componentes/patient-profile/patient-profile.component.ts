import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { ManagementService } from 'src/services/patients/management.service';
import { ExpedientComponent } from '../expedient/expedient.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Sessions } from 'src/app/interfaces/sessions.interface';
import { Subscription } from 'rxjs';
import { ReloadService } from 'src/services/reload/reload.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css'],
})
export class PatientProfileComponent implements OnInit {
  private readonly mainURL = `${environment.apiURL}`;
  private readonly localURL = `${environment.localURL}`;

  private subscriptionName: Subscription;

  constructor(
    private expedientData: ExpedientComponent,
    private patientManagement: ManagementService,
    private reloadService: ReloadService,
    private http: HttpClient,
    private app: AppComponent
  ) {
    this.subscriptionName = this.reloadService
      .reload()
      .subscribe((res: any) => {
        if (res.reload === true) {
          console.log('Component Reloaded');
          return this.getSessions(this.patient_id);
        }
        return console.log('Component was not Reloaded');
      });
  }

  patient_id: any;
  patient: any;
  sessions: Sessions | any;

  ngOnInit(): void {
    this.getPatientId();
    this.getSessions(this.patient_id);
  }

  async getPatientId() {
    if (this.patientManagement.patient) {
      this.patient_id = this.patientManagement.patient._id;
      sessionStorage.setItem('patient_id', this.patient_id);
      this.http
        .get(this.mainURL + `api/get/patient/${this.patient_id}`, {
          withCredentials: true,
        })
        .subscribe((res: any) => {
          this.patient = res.patient;
        });
      return;
    } else {
      this.patient_id = sessionStorage.getItem('patient_id');
      console.log({ patient_id: this.patient_id });
      this.http
        .get(this.mainURL + `api/get/patient/${this.patient_id}`, {
          withCredentials: true,
        })
        .subscribe((res: any) => {
          this.patient = res.patient;
        });
      return;
    }
  }

  getSessions(patient_id: any) {
    this.http
      .get(this.mainURL + `api/get/all/appointments/${patient_id}`, {
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.sessions = res.sessions;
        console.log(res);
      });
  }

  deleteSession(session_id: any) {
    this.app.openDeleteSession();
    sessionStorage.setItem('session_id', session_id);
  }

  bringPatient() {
    console.log(sessionStorage.getItem('patient'));
  }

  openGraphModal(session_id: any) {
    this.app.openGraph();
    sessionStorage.setItem('session_id', session_id);
  }
}
