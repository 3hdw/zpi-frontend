import {EventEmitter, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserManagerService} from './user-manager.service';
import {Result} from '../models/Result';

@Injectable({
  providedIn: 'root'
})
export class AuthManagerService {

  private _isLoggedIn = false;
  private _userName: string;
  private _playerId: number;
  private _loginEmitter: EventEmitter<Result> = new EventEmitter<Result>();
  private _basicToken: string;
  private _password: string;

  constructor() {
  }

  public isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  private authenticate(userName: string, playerId: number, password: string) {
    this._isLoggedIn = true;
    this._userName = userName;
    this._playerId = playerId;
    this._basicToken = 'Basic ' + btoa(this._userName + ':' + password);
    this._password = password;
  }

  public login(login: string, password: string, userManager: UserManagerService, router: Router) {
    userManager.login(btoa(login + ':' + password), login).subscribe(
      next => {
        this.authenticate(next.nickname, next.id, password);
        router.navigate(['menu']);
      },
      error => {
        this._loginEmitter.emit(new Result(true, true));
      },
      () => {
        this._loginEmitter.emit(new Result(true, false));
      }
    );
  }

  get password(): string {
    return this._password;
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  get userName(): string {
    return this._userName;
  }

  get basicToken(): string {
    return this._basicToken;
  }

  get playerId(): number {
    return this._playerId;
  }

  get loginEmitter(): EventEmitter<Result> {
    return this._loginEmitter;
  }
}
