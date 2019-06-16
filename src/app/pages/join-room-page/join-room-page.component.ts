import {Component, OnInit} from '@angular/core';
import {FetchDataService} from '../../services/fetch-data.service';
import {LobbyDTO} from '../../models/api/LobbyDTO';
import {PlayerDTO} from '../../models/api/PlayerDTO';
import {UtilsService} from '../../services/utils.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-join-room-page',
  templateUrl: './join-room-page.component.html',
  styleUrls: ['./join-room-page.component.css']
})
export class JoinRoomPageComponent implements OnInit {

  data: [LobbyDTO, PlayerDTO[]][] = [];
  isLoading = false;
  p = 1;

  constructor(private fetchDataService: FetchDataService, private utils: UtilsService,
              private router: Router) {
  }

  ngOnInit() {
    this.fetchData();
  }

  clearEmptyLobbies() {
    this.data = this.data.filter(e => e[1].length > 0);
  }

  private fetchData() {
    this.fetchDataService.getLobbies().subscribe(
      next => {
        this.data = this.utils.extractDataFromLobbies(next);
        this.clearEmptyLobbies();
      },
      error => {
      },
      () => {
      }
    );
  }

  onJoin(lobbyName: string) {
    this.isLoading = true;
    this.fetchDataService.joinLobby(lobbyName).subscribe(
      next => {
        this.isLoading = false;
        this.router.navigate(['lobby/' + lobbyName]);
      },
      error => {
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
}
