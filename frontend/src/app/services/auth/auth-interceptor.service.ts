import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MessageService} from '../message/message.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private messageService: MessageService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    if (sessionStorage.getItem('token') != null) {
      authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))});
    }
    return next.handle(authReq).pipe(catchError(  (error: HttpErrorResponse) => {
      if (error.status === 401) {
        this.messageService.displayErrorMessage('Session expired!');
        sessionStorage.clear();
        this.router.navigate(['login']);
      }
      return throwError(error.message);
    }));
  }
}
