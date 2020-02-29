import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('1 -Zahtijev AuthInterceptorService');
    console.log(req.headers);
    const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'AuthInterceptorService')});
    return next.handle(modifiedRequest)
    .pipe(tap (event => {
      if (event.type === HttpEventType.Response) {
        console.log('1 -AuthInterceptorService  response ');
      }
    }));
  }
}
