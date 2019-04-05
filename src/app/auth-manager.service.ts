import {EventEmitter, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserManagerService} from './user-manager.service';
import {Result} from './models/Result';

@Injectable({
  providedIn: 'root'
})
export class AuthManagerService {

  private _isLoggedIn = false;
  private _userName: string;
  private _loginEmitter: EventEmitter<Result> = new EventEmitter<Result>();

  constructor() {
  }

  public isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  private authenticate(userName: string) {
    this._isLoggedIn = true;
    this._userName = userName;
  }

  public login(login: string, password: string, userManager: UserManagerService, router: Router) {
    userManager.login(btoa(login + ':' + password), login).subscribe(
      next => {
        this.authenticate(login);
        router.navigate(['jorcr']);
      },
      error => {
        this._loginEmitter.emit(new Result(true, true));
      },
      () => {
        this._loginEmitter.emit(new Result(true, false));
      }
    );
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  get userName(): string {
    return this._userName;
  }

  get loginEmitter(): EventEmitter<Result> {
    return this._loginEmitter;
  }
}
