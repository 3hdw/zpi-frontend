import {EventEmitter, Injectable} from '@angular/core';
import {AddressStorageService} from './address-storage.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {AuthManagerService} from './auth-manager.service';
import {BehaviorSubject} from 'rxjs';
import {SocketMessage} from '../models/api/SocketMessage';
import {v4 as uuid} from 'uuid';
import {audit} from 'rxjs/operators';
import {HttpHeaders} from '@angular/common/http';
import {GameDTO} from '../models/api/GameDTO';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient;
  private socketMessage = new BehaviorSubject<string>('');
  socketMessage$ = this.socketMessage.asObservable();

  constructor(private addressStorage: AddressStorageService, private authManager: AuthManagerService) {
  }


  connectToLobbyWebSocket(lobbyName: string): void {
    const that = this;
    const ws = new SockJS(this.addressStorage.apiAddress + '/socket', null, {
      sessionId: function (): string {
        return that.authManager.playerId + ':' + lobbyName + ':' + uuid();
      }
    });
    this.stompClient = Stomp.over(ws);
     this.stompClient.debug = null;
    this.stompClient.connect({}, function () {
      that.stompClient.subscribe('/lobby/' + lobbyName, (message) => {
        if (message.body) {
          that.socketMessage.next(message.body);
        }
      });
    });
  }


  connectToGameSocket(gameName: string): void {
    const that = this;
    const ws = new SockJS(this.addressStorage.apiAddress + '/socket');
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = null;
    this.stompClient.connect({}, function () {
      that.stompClient.subscribe('/game/' + gameName, (message) => {
        if (message.body) {
          that.socketMessage.next(message.body);
        }
      });
    });
  }

  onDestroy() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }
}
