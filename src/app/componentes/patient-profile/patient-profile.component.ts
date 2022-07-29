import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { ManagementService } from 'src/services/patients/management.service';
import { ExpedientComponent } from '../expedient/expedient.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Sessions } from 'src/app/interfaces/sessions.interface';
import { Subscription } from 'rxjs';
import { ReloadService } from 'src/services/reload/reload.service';

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
    private http: HttpClient,
    private reloadService: ReloadService
  ) {
    this.subscriptionName = this.reloadService
      .reload()
      .subscribe((res: any) => {
        if (res.reload === true) {
          return this.getSessions(this.patient_id);
        }
        return;
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
        .get(this.localURL + `api/get/patient/${this.patient_id}`, {
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
        .get(this.localURL + `api/get/patient/${this.patient_id}`, {
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
      .get(this.localURL + `api/get/all/appointments/${patient_id}`, {
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.sessions = res.sessions;
        console.log(res);
      });
  }

  bringPatient() {
    console.log(sessionStorage.getItem('patient'));
  }
}
