import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/services/authe/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private readonly mainURL = `${environment.apiURL}`;
  private readonly localURL = `${environment.localURL}`;
  constructor(
    private cookie: CookieService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  isLoggedIn() {
    if (!this.cookie.get('login')) {
      return false;
    } else {
      return true;
    }
  }

  logOut() {
    this.cookie.delete('login');
    this.http.get(this.localURL + 'api/logout').subscribe((resp: any) => {
      this.toastr.success(resp);
    });
  }
}
