import {Injectable} from '@angular/core';
import {MockRoom} from '../models/MockRoom';
import {Observable, of} from 'rxjs';
import {Letter} from '../models/Letter';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AddressStorageService} from './address-storage.service';
import {LobbyDTO} from '../models/api/LobbyDTO';
import {AuthManagerService} from './auth-manager.service';

export const MOCK_ROOMS: MockRoom[] = [
  {id: 's123aqwd', freeSlots: 5, maxSlots: 10, ping: 1, level: 'Trudny'},
  {id: '23wd', freeSlots: 2, maxSlots: 10, ping: 5, level: 'Trudny'},
  {id: 's321', freeSlots: 3, maxSlots: 10, ping: 4, level: 'Łatwy'},
  {id: 'as21', freeSlots: 4, maxSlots: 10, ping: 3, level: 'Trudny'},
  {id: 'sssd213', freeSlots: 1, maxSlots: 10, ping: 1, level: 'Trudny'},
  {id: 'asa', freeSlots: 1, maxSlots: 10, ping: 1, level: 'Średni'},
  {id: 'aa', freeSlots: 1, maxSlots: 10, ping: 2, level: 'Trudny'},
  {id: 'dd', freeSlots: 5, maxSlots: 10, ping: 1, level: 'Trudny'},
  {id: 'dd', freeSlots: 5, maxSlots: 10, ping: 1, level: 'Trudny'},
  {id: 'dd', freeSlots: 5, maxSlots: 10, ping: 1, level: 'Trudny'},
  {id: 'dd', freeSlots: 5, maxSlots: 10, ping: 1, level: 'Trudny'},
  {id: 'dd', freeSlots: 5, maxSlots: 10, ping: 1, level: 'Trudny'},
  {id: 'dd', freeSlots: 5, maxSlots: 10, ping: 1, level: 'Trudny'},
  {id: 'dd', freeSlots: 5, maxSlots: 10, ping: 1, level: 'Trudny'},
  {id: 'dd', freeSlots: 5, maxSlots: 10, ping: 1, level: 'Trudny'},
  {id: 'dd', freeSlots: 5, maxSlots: 10, ping: 1, level: 'Trudny'},
  {id: 'dd', freeSlots: 5, maxSlots: 10, ping: 1, level: 'Trudny'},
  {id: 'ddw123', freeSlots: 9, maxSlots: 10, ping: 1, level: 'Trudny'},
];

export const MOCK_GAMESTATE = [
  [null, new Letter('h'), null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, new Letter('e'), null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, new Letter('l'), null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, new Letter('l'), null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, new Letter('o'), new Letter('c'), new Letter('u'), new Letter('l'), new Letter('a'), new Letter('r'), null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
];

export const MOCK_LETTER_POOL: Letter[] = [
  new Letter('h'), new Letter('w'), new Letter('o'), new Letter('r'), new Letter('l'), new Letter('d')
];


@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  constructor(private addressStorage: AddressStorageService, private http: HttpClient, private authManager: AuthManagerService) {
  }

  getLobbies(): Observable<LobbyDTO[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authManager.basicToken
      })
    };
    return this.http.get<LobbyDTO[]>(this.addressStorage.apiAddress + '/games', httpOptions);
  }

  createLobby(): Observable<LobbyDTO> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authManager.basicToken
      })
    };
    return this.http.post<LobbyDTO>(this.addressStorage.apiAddress + '/games?playerId=' + this.authManager.playerId, null, httpOptions);
  }

  getLobby(lobbyName: string): Observable<LobbyDTO> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authManager.basicToken
      })
    };
    return this.http.get<LobbyDTO>(this.addressStorage.apiAddress + '/games/' + lobbyName, httpOptions);
  }

  joinLobby(lobbyName: string): Observable<LobbyDTO> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authManager.basicToken
      })
    };
    return this.http.patch<LobbyDTO>(this.addressStorage.apiAddress + '/games/' + lobbyName + '/addPlayer?playerId='
      + this.authManager.playerId, null, httpOptions);
  }

  quitLobby(lobbyName: string): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authManager.basicToken
      })
    };
    return this.http.patch<LobbyDTO>(this.addressStorage.apiAddress + '/games/' + lobbyName + '/removePlayer?playerId='
      + this.authManager.playerId, null, httpOptions);
  }

  getMockRooms(): Observable<MockRoom[]> {
    return of(MOCK_ROOMS);
  }

  getMockGameState(): Observable<Letter[][]> {
    return of(MOCK_GAMESTATE);
  }

  getMockLetterPool(): Observable<Letter[]> {
    return of(MOCK_LETTER_POOL);
  }
}
