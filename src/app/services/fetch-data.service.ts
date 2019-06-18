import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AddressStorageService} from './address-storage.service';
import {LobbyDTO} from '../models/api/LobbyDTO';
import {AuthManagerService} from './auth-manager.service';
import {GameDTO} from '../models/api/GameDTO';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  constructor(private addressStorage: AddressStorageService,
              private http: HttpClient,
              private authManager: AuthManagerService) {
  }

  makeMove(gameName: string, move: Map<string, string>): Observable<GameDTO> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authManager.basicToken
      })
    };
    const dtoMap = {};
    move.forEach((value: string, key: string) => {
      dtoMap[key] = value;
    });
    return this.http.patch<GameDTO>(this.addressStorage.apiAddress + '/games/' + gameName + '/move?playerId=' + this.authManager.playerId, dtoMap, httpOptions);
  }

  swapLetters(gameName: string, characters: string[]): Observable<GameDTO> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authManager.basicToken
      })
    };
    return this.http.patch<GameDTO>(this.addressStorage.apiAddress + '/games/' + gameName + '/tradeLetters?playerId=' + this.authManager.playerId, characters, httpOptions);
  }

  getHint(gameName: string): Observable<Map<string, string>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authManager.basicToken
      })
    };
    return this.http.get<Map<string, string>>(this.addressStorage.apiAddress + '/games/' + gameName + '/hint', httpOptions);
  }

  addAi(gameName: string): Observable<GameDTO> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authManager.basicToken
      })
    };
    return this.http.patch<GameDTO>(this.addressStorage.apiAddress + '/games/' + gameName + '/addAI', null, httpOptions);
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

  quitLobby(lobbyName: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authManager.basicToken
      })
    };
    this.http.patch<LobbyDTO>(this.addressStorage.apiAddress + '/games/' + lobbyName + '/removePlayer?playerId='
      + this.authManager.playerId, null, httpOptions).subscribe(
      next => {

      },
      error => {
      },
      () => {
      }
    )
    ;
  }

  startLobby(lobbyName: string): Observable<GameDTO> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authManager.basicToken
      })
    };
    return this.http.patch<GameDTO>(this.addressStorage.apiAddress + /games/ + lobbyName + '/start', null, httpOptions);
  }
}
