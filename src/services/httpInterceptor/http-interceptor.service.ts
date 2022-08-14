// import { ErrorHandler, Injectable } from '@angular/core';
// import { HttpErrorResponse } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { catchError, Observable, throwError } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class HttpInterceptorService implements ErrorHandler {
//   constructor() {}

//   handleError(error: Error | HttpErrorResponse) {
//     console.log('HTTP Error detected');
//     console.error(error);
//   }

//   // intercept(
//   //   req: HttpRequest<any>,
//   //   next: HttpHandler
//   // ): Observable<HttpEvent<any>> {
//   //   return next.handle(req).pipe(
//   //     catchError((error: Error) => {
//   //       console.log('An error was intercepted');
//   //       console.error(error);
//   //       return throwError(() => {
//   //         return error;
//   //       });
//   //     })
//   //   );
//   // }
// }
