import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { ManagementService } from 'src/services/patients/management.service';
import { ExpedientComponent } from '../expedient/expedient.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css'],
})
export class PatientProfileComponent implements OnInit {
  private readonly mainURL = `${environment.apiURL}`;
  private readonly localURL = `${environment.localURL}`;

  constructor(
    private expedientData: ExpedientComponent,
    private patientManagement: ManagementService,
    private http: HttpClient
  ) {}

  patient_id: any;
  patient: any;

  ngOnInit(): void {
    this.getPatientId();
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

  bringPatient() {
    console.log(sessionStorage.getItem('patient'));
  }
}
