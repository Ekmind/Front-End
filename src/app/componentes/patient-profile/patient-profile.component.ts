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
  patient: Patient | any;

  constructor(
    private expedientData: ExpedientComponent,
    private pat: ManagementService
  ) {}

  ngOnInit(): void {
    this.getPatient();
  }

  async getPatient() {
    const patient = this.patient;
    await console.log(patient);
  }
}
