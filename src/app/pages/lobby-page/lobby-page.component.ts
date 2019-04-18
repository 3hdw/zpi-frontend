import {Component, OnDestroy, OnInit} from '@angular/core';
import {FetchDataService} from '../../services/fetch-data.service';
import {LobbyDTO} from '../../models/api/LobbyDTO';
import {PlayerDTO} from '../../models/api/PlayerDTO';
import {UtilsService} from '../../services/utils.service';
import {WebSocketService} from '../../services/web-socket.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-lobby-page',
  templateUrl: './lobby-page.component.html',
  styleUrls: ['./lobby-page.component.css']
})
export class LobbyPageComponent implements OnInit, OnDestroy {

  lobbyName: string;
  data: [LobbyDTO, PlayerDTO[]] = [null, []];
  private subscription: Subscription;
  private _readyPlayers: PlayerDTO[] = [];

  constructor(private fetchDataService: FetchDataService, private utils: UtilsService, private webSocket: WebSocketService,
              private route: ActivatedRoute, private router: Router) {
  }

  onStartClicked() {

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
  }

  private quit(lobbyName: string) {
    this.fetchDataService.quitLobby(lobbyName).subscribe(
      next => {
        this.router.navigate(['menu']);
      },
      error => {
      },
      () => {
      }
    );
  }

  private init() {
    this.lobbyName = this.route.snapshot.paramMap.get('name');
    if (!this.lobbyName) {
      this.createLobby();
    } else {
      this.getLobby();
    }
  }

  private createLobby() {
    this.fetchDataService.createLobby().subscribe(
      next => {
        this.data = this.utils.extractDataFromLobby(next);
        this.lobbyName = next.name;
        this.webSocket.initializeWebSocketConnection(this.lobbyName);
        this.subscription = this.webSocket.fetchedLobbyName$.subscribe(
          data => this.refreshLobby(data)
        );
      },
      error => {
      },
      () => {
      }
    );
  }

  private getLobby() {
    this.fetchDataService.getLobby(this.lobbyName).subscribe(
      next => {
        this.data = this.utils.extractDataFromLobby(next);
        this.webSocket.initializeWebSocketConnection(this.lobbyName);
        this.subscription = this.webSocket.fetchedLobbyName$.subscribe(
          data => this.refreshLobby(data)
        );
      },
      error => {
      },
      () => {
      }
    );
  }

  private refreshLobby(data: string) {
    if (this.lobbyName.toLowerCase() === data.toLowerCase()) {
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
  }
}
