import {Component, OnInit} from '@angular/core';
import {FetchDataService} from '../../services/fetch-data.service';
import {AuthManagerService} from '../../services/auth-manager.service';
import {LobbyDTO} from '../../models/api/LobbyDTO';
import {PlayerDTO} from '../../models/api/PlayerDTO';
import {Pair} from '../../models/Pair';

@Component({
  selector: 'app-player-games-page',
  templateUrl: './player-games-page.component.html',
  styleUrls: ['./player-games-page.component.css']
})
export class PlayerGamesPageComponent implements OnInit {

  data: [LobbyDTO, PlayerDTO[]][] = [];

  constructor(private fetchDataService: FetchDataService) {
  }

  ngOnInit() {
    this.fetchData();
  }

  private fetchData() {
    this.fetchDataService.getLobbies().subscribe(
      next => {
        this.extractData(next);
      },
      error => {
      },
      () => {
      }
    );
  }

  private extractData(lobbies: LobbyDTO[]) {
    let tuple: [LobbyDTO, PlayerDTO[]] = [null, []];
    for (const lobby of lobbies) {
      tuple[0] = lobby;
      for (const lobbyPlayer of lobby.players) {
        tuple[1].push(lobbyPlayer.player);
      }
      if (tuple[0] !== null) {
        this.data.push(tuple);
      }
      tuple = [null, []];
    }
  }
}
