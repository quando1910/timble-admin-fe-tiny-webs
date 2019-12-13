import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { tap } from 'rxjs/operators';
import { ErrorHandler } from './error-handler';
import { CommonService } from '../common.service';

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private common: CommonService,
    private errorHandler: ErrorHandler
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = request.clone({
      setHeaders: {
        'Authorization': localStorage.getItem( 'ACCESS_TOKEN' ) ? `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` : ''
      }
    });
    return next.handle(authReq).pipe(
      tap((event: HttpEvent<any>) => {}, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.errorHandler.handleError(err);
        }
      })
    );
  }
}
