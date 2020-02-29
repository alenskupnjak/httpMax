import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class LogiinInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('3- Zahtijev LogiinInterceptorService');
    console.log(req.headers);
    return next.handle(req).pipe(tap(event => {
        if (event.type === HttpEventType.Response) {
        console.log('3- LogiinInterceptorService response ');
        // console.log(event.body);
       }
    }));
  }
}


// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
// import { tap } from 'rxjs/operators';

// export class LogiinInterceptorService implements HttpInterceptor {
//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     console.log(' Zahtijev poslan');
//     console.log(req.url);
//     const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')});
//     return next.handle(modifiedRequest).pipe(tap (event => {
//       console.log(event);
//       if (event.type === HttpEventType.Response) {
//         console.log('Response arrived, body data: ');
//         console.log(event.body);
//       }
//     }));
//   }
// }
