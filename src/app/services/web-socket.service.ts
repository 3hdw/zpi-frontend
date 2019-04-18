import {EventEmitter, Injectable} from '@angular/core';
import {AddressStorageService} from './address-storage.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {AuthManagerService} from './auth-manager.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient;
  private _fetchedLobbyName = new BehaviorSubject<string>('');
  fetchedLobbyName$ = this._fetchedLobbyName.asObservable();

  constructor(private addressStorage: AddressStorageService, private authManager: AuthManagerService) {
  }

  initializeWebSocketConnection(lobbyName: string): void {
    const ws = new SockJS(this.addressStorage.apiAddress + '/socket');
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = null;
    const that = this;
    this.stompClient.connect({}, function () {
      that.stompClient.subscribe('/lobby', (message) => {
        if (message.body) {
          that._fetchedLobbyName.next(message.body);
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
