import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressStorageService {

  private _apiAddress = 'http://localhost:8080/api';
  // private _apiAddress = 'https://scrabbleapi.herokuapp.com/api';
  private _createUserEndpoint = '/players';
  private _getLobbiesEndpoint = '/games';
  private _loginEndpoint = '/players';

  constructor() {
  }

  get apiAddress(): string {
    return this._apiAddress;
  }

  get createUserEndpoint(): string {
    return this._createUserEndpoint;
  }

  get getLobbiesEndpoint(): string {
    return this._getLobbiesEndpoint;
  }

  get loginEndpoint(): string {
    return this._loginEndpoint;
  }
}
