import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/interfaces/doctor.interface';
import { Patient } from 'src/app/models/patient';
import { Patients } from 'src/app/interfaces/patients.interface';
import { AuthService } from 'src/services/authe/auth.service';
import { environment } from 'src/environments/environment';
import { ManagementService } from 'src/services/patients/management.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

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
    age: Number,
    gender: '',
    email: '',
  });

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private pat: ManagementService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.http
      .get(this.localURL + 'api/login', { withCredentials: true })
      .subscribe((res: any) => {
        this.user = res.user;
        this.list(this.user._id);
      });
  }

  async list(user_id: any): Promise<void> {
    await console.log({ user_id: user_id });
    await this.http
      .get(this.localURL + `api/get/all/patients/${user_id}`, {
        withCredentials: true,
      })
      .subscribe((res: any) => {
        console.log(res);
        this.patients = res.patients;
      });
  }

  newPatient() {}

  submitPatient(user_id: any, patient: any) {
    console.log({ user: user_id, patient: patient });
    this.http
      .post(this.localURL + `api/insert/patient/${user_id}`, patient, {
        withCredentials: true,
      })
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
