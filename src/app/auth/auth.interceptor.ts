import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHelper } from './auth.helper';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth header from the service.
    const authHeader = AuthHelper.getAuthorizationHeader();

    // Clone the request to add the new header.
    const authReq = req.clone({ headers: req.headers.set('Authorization', authHeader) });

    // Pass on the cloned request instead of the original request.
    return next.handle(authReq);
  }
}
