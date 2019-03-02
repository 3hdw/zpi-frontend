import {Injectable} from '@angular/core';
import {AddressStorageService} from './address-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PlayerDTO} from './models/api/PlayerDTO';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  private readonly address: string;

  constructor(private addressStorage: AddressStorageService, private http: HttpClient) {
    this.address = this.addressStorage.apiAddress + this.addressStorage.createUserEndpoint;
  }

  registerPlayer(player: PlayerDTO): Observable<Object> {
    return this.http.post(this.address, player, httpOptions);
  }
}
