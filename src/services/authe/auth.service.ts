import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/interfaces/doctor.interface';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Doctor | any;
  private readonly mainURL = `${environment.apiURL}`;
  private readonly localURL = `${environment.localURL}`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private cookie: CookieService
  ) {}
  logUser(email: string, password: string) {
    this.http
      .post(
        this.localURL + 'api/login',
        { email: email, password: password },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
          withCredentials: true,
        }
      )
      .subscribe((res: any) => {
        console.log(res);
        this.user = res.user;
        this.toastr.success(res.message);
        this.router.navigate(['expedient']);
        this.cookie.set('login', res.user);
      });
  }

  logOut() {
    this.cookie.delete('login');
    this.http.get(this.localURL + 'api/logout').subscribe((resp: any) => {
      this.toastr.success(resp);
    });
  }

  public get logIn(): boolean {
    if (this.cookie.get('login')) return true;

    return false;
  }
}
