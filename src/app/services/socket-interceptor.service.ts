import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthManagerService} from './auth-manager.service';

@Injectable({
  providedIn: 'root'
})
export class SocketInterceptorService implements HttpInterceptor {

  constructor(private authManager: AuthManagerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Wysylanie requesta na adres:', req.url, 'body: ', req.body);
    // req = req.clone({
    //   setHeaders: {
    //     Authorization: this.authManager.basicToken
    //   }
    // });
    return next.handle(req);
  }
}
