import {Injectable} from '@angular/core';
import {AddressStorageService} from './address-storage.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {AuthManagerService} from './auth-manager.service';
import {BehaviorSubject} from 'rxjs';
import {v4 as uuid} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient;
  private ws;
  private socketMessage = new BehaviorSubject<string>('');
  socketMessage$ = this.socketMessage.asObservable();
  private subscription;
  isSubscribed = false;

  constructor(private addressStorage: AddressStorageService, private authManager: AuthManagerService) {
  }


  connectToLobbyWebSocket(lobbyName: string): void {
    const that = this;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.ws = new SockJS(this.addressStorage.apiAddress + '/socket', null, {
      sessionId: function (): string {
        return that.authManager.playerId + ':' + lobbyName + ':' + uuid();
      }
    });
    this.stompClient = Stomp.over(this.ws);
    this.stompClient.debug = null;

    this.stompClient.connect({}, function () {
      that.stompClient.subscribe('/lobby/' + lobbyName, (message) => {
        that.isSubscribed = true;
        if (message.body) {
          that.socketMessage.next(message.body);
        }
      });
    });
  }


  connectToGameSocket(gameName: string): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.ws = new SockJS(this.addressStorage.apiAddress + '/socket');
    this.stompClient = Stomp.over(this.ws);
    this.stompClient.debug = null;
    this.subLobby(gameName);
    console.log('@2222222222222222@@@ ', this.ws.readyState);
  }

  subLobby(gameName: string) {
    // console.log('STATUS: ', this.ws.readyState);
    const that = this;
    this.stompClient.connect({}, function () {
      that.subscription = that.stompClient.subscribe('/game/' + gameName, (message) => {
        if (message.body) {
          that.socketMessage.next(message.body);
        }
      });
    });
  }


  onDestroy() {
    try {
      this.subscription.unsubscribe();
      this.stompClient.unsubscribe();
      this.stompClient.disconnect();
      this.ws.close();
      this.stompClient = null;
      this.ws = null;
    } catch (e) {

    }
  }
}
