import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  private readonly mainURL = `${environment.apiURL}`;
  private readonly localURL = `${environment.localURL}`;

  public patients = <any>[];

  public patient = {
    _id: String,
    name: String,
    last_name: String,
    age: Number,
    gender: String,
    phone: Number,
    image: String,
    email: String,
    isActive: Boolean,
    createdAt: Date,
    updatedAt: Date,
  };

  constructor(private http: HttpClient) {}
}
