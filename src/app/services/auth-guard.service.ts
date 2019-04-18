import { Injectable } from '@angular/core';
import {AuthManagerService} from './auth-manager.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authManager: AuthManagerService, private router: Router) { }

  canActivate(): boolean {
    if (!this.authManager.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
