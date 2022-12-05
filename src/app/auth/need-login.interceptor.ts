import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SignOut } from './auth.actions';

@Injectable()
export class NeedLoginInterceptor implements HttpInterceptor {
  constructor(private router: Router, private store: Store) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Pass on the cloned request instead of the original request.
    return next.handle(req).pipe(
      catchError(err => {
        if (err && err.status === 401) {
          this.store.dispatch(new SignOut());
          // this.router.navigateByUrl('/login');
          return EMPTY;
        }
        return throwError(err);
      })
    );
  }
}
