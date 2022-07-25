import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { ManagementService } from 'src/services/patients/management.service';
import { ExpedientComponent } from '../expedient/expedient.component';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css'],
})
export class PatientProfileComponent implements OnInit {
  constructor(
    private expedientData: ExpedientComponent,
    private patientManagement: ManagementService
  ) {}

  patient: any;

  ngOnInit(): void {
    this.getPatient();
  }

  async getPatient() {
    if (this.patientManagement.patient !== null || undefined) {
      this.patient = this.patientManagement.patient;
      await console.log(this.patient);
      return;
    }
  }
}
