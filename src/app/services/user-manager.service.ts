import {Injectable} from '@angular/core';
import {AddressStorageService} from './address-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PlayerDTO} from '../models/api/PlayerDTO';
import {Observable} from 'rxjs';
import {b} from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  private readonly address: string;

  constructor(private addressStorage: AddressStorageService, private http: HttpClient) {
    this.address = this.addressStorage.apiAddress;
  }

  registerPlayer(player: PlayerDTO): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    };
    return this.http.post(this.address + this.addressStorage.createUserEndpoint, player, httpOptions);
  }

  login(basicAuthHeader: string, playerName: string): Observable<PlayerDTO> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + basicAuthHeader,
      })
    };
    return this.http.get<PlayerDTO>(this.address + this.addressStorage.loginEndpoint + '/' + playerName, httpOptions);
  }
}
