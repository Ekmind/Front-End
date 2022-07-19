import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/interfaces/doctor.interface';
import { Patient } from 'src/app/interfaces/patient.interface';
import { AuthService } from 'src/services/authe/auth.service';
import { environment } from 'src/environments/environment';
import { ManagementService } from 'src/services/patients/management.service';

@Component({
  selector: 'app-expedient',
  templateUrl: './expedient.component.html',
  styleUrls: ['./expedient.component.css'],
})
export class ExpedientComponent implements OnInit {
  private readonly mainURL = `${environment.apiURL}`;
  private readonly localURL = `${environment.localURL}`;
  user: Doctor | any;
  patient: Patient | any;

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private patients: ManagementService
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
        this.patient = res;
      });
  }
}
