import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly mainURL = `${environment.apiURL}`;
  private signUp = 'api/signup';

  constructor(private http: HttpClient) {}

  postUser(user: any) {
    return this.http.post(this.mainURL + this.signUp, user);
  }
  log(message: string) {}
  handleError<T>(operation = 'operation', request?: T) {
    return (error: any) => {
      if (error.error instanceof Error) {
        return throwError(error);
      }
      return throwError(error);
    };
  }

  getUserById(): Observable<any> {
    const url = `${this.mainURL}api/login`;

    return this.http.get<User[]>(url, { observe: 'response' }).pipe(
      tap((data) => this.log(url)),
      catchError(this.handleError(url))
    );
  }
}
