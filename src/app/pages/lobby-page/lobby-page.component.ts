import {Component, OnDestroy, OnInit} from '@angular/core';
import {FetchDataService} from '../../services/fetch-data.service';
import {LobbyDTO} from '../../models/api/LobbyDTO';
import {PlayerDTO} from '../../models/api/PlayerDTO';
import {UtilsService} from '../../services/utils.service';
import {WebSocketService} from '../../services/web-socket.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {SocketMessage} from '../../models/api/SocketMessage';
import {GameDTO} from '../../models/api/GameDTO';
import {ShareDataService} from '../../services/share-data.service';
import {CanDeactivate} from '../../models/CanDeactivate';

@Component({
  selector: 'app-lobby-page',
  templateUrl: './lobby-page.component.html',
  styleUrls: ['./lobby-page.component.css']
})
export class LobbyPageComponent extends CanDeactivate implements OnInit, OnDestroy {

  lobbyName: string;
  data: [LobbyDTO, PlayerDTO[]] = [null, []];
  private subscription: Subscription;
  private _readyPlayers: PlayerDTO[] = [];
  private isStarted = false;

  constructor(private fetchDataService: FetchDataService,
              private utils: UtilsService,
              private webSocket: WebSocketService,
              private route: ActivatedRoute,
              private router: Router,
              private shareDataService: ShareDataService) {
    super();
  }

  onStartClicked() {
    console.log('start clicked');
    this.fetchDataService.startLobby(this.lobbyName).subscribe(
      next => {
        console.log(next);
      },
      error => {
        console.log(error);
      },
      () => {
      }
    );
  }

  onQuitClicked(lobbyName: string) {
    this.quit(lobbyName);
  }

  readyCount(): number {
    return this._readyPlayers.length;
  }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.webSocket.onDestroy();
    if (!this.canDeactivate()) {
      this.cleanUp();
    }
  }

  private quit(lobbyName: string) {
    this.router.navigate(['menu']);
  }

  private init() {
    this.lobbyName = this.route.snapshot.paramMap.get('name');
    if (!this.lobbyName) {
      this.onCreateInit();
    } else {
      this.onJoinInit();
    }
  }

  private onCreateInit() {
    this.fetchDataService.createLobby().subscribe(
      next => {
        this.data = this.utils.extractDataFromLobby(next);
        this.lobbyName = next.name;
        this.webSocket.connectToLobbyWebSocket(this.lobbyName);
        this.subscription = this.webSocket.socketMessage$.subscribe(
          socketMessage => this.handleSocketMessage(socketMessage)
        );
      },
      error => {
        console.log(error);
      },
      () => {
      }
    );
  }

  private onJoinInit() {
    this.fetchDataService.getLobby(this.lobbyName).subscribe(
      next => {
        this.data = this.utils.extractDataFromLobby(next);
        this.webSocket.connectToLobbyWebSocket(this.lobbyName);
        this.subscription = this.webSocket.socketMessage$.subscribe(
          socketMessage => this.handleSocketMessage(socketMessage)
        );
      },
      error => {
      },
      () => {
      }
    );
  }

  private handleSocketMessage(socketMessage: string) {
    console.log('poke');
    if (socketMessage) {
      const socketMsg: SocketMessage = JSON.parse(socketMessage);
      if (socketMsg.header === 'CHANGE') {
        this.refreshLobby();
      } else if (socketMsg.header === 'START') {
        if (socketMsg.body) {
          this.onStartLobby(socketMsg.body);
        }
      } else {
      }
    }
  }

  private refreshLobby() {
    this.fetchDataService.getLobby(this.lobbyName).subscribe(
      lobbyData => {
        this.data = this.utils.extractDataFromLobby(lobbyData);
      },
      error => {
      },
      () => {
      }
    );
  }

  private onStartLobby(gameDto: GameDTO) {
    this.isStarted = true;
    this.shareDataService.game = gameDto;
    this.router.navigate(['play']);
  }

  canDeactivate(): boolean {
    return this.isStarted;
  }

  cleanUp() {
    this.fetchDataService.quitLobby(this.lobbyName);
  }
}
