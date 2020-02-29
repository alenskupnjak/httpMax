import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthProbaService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('2-  Zahtijev AuthProbaService');
    console.log(req.headers);
    const modifiedRequest = req.clone({headers: req.headers.append('Autorizacija', 'AuthProbaService')});
    return next.handle(modifiedRequest)
    .pipe(tap (event => {
      if (event.type === HttpEventType.Response) {
        console.log('2- AuthProbaService response ');
        // console.log(event.body);
      }
    }));
  }
}
