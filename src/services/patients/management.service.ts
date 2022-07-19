import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  private readonly mainURL = `${environment.apiURL}`;
  private readonly localURL = `${environment.localURL}`;

  constructor(private http: HttpClient) {}

  public getAll(user_id: any) {
    this.http.get(this.localURL + `api/get/all/patients/${user_id}`);
  }
}
