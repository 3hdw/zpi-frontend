import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressStorageService {

  private _apiAddress = 'https://scrabbleapi.herokuapp.com/api';
  private _createUserEndpoint = '/players';

  constructor() {
  }

  get apiAddress(): string {
    return this._apiAddress;
  }

  get createUserEndpoint(): string {
    return this._createUserEndpoint;
  }
}
