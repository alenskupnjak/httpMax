import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthProbaService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(' Zahtijev poslan iz probe');
    console.log(req.url);
    const modifiedRequest = req.clone({headers: req.headers.append('Autorizacija', 'moje')});
    return next.handle(modifiedRequest)
    .pipe(tap (event => {
      if (event.type === HttpEventType.Response) {
        console.log('Response paroba arrived, body data: ');
        console.log(event.body);
      }
    }));
  }
}
