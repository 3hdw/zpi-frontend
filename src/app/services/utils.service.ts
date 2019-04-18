import {Injectable} from '@angular/core';
import {LobbyDTO} from '../models/api/LobbyDTO';
import {PlayerDTO} from '../models/api/PlayerDTO';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() {
  }

  extractDataFromLobbies(lobbies: LobbyDTO[]): [LobbyDTO, PlayerDTO[]][] {
    const data: [LobbyDTO, PlayerDTO[]][] = [];
    let tuple: [LobbyDTO, PlayerDTO[]] = [null, []];
    for (const lobby of lobbies) {
      tuple[0] = lobby;
      for (const lobbyPlayer of lobby.players) {
        tuple[1].push(lobbyPlayer.player);
      }
      if (tuple[0] !== null) {
        data.push(tuple);
      }
      tuple = [null, []];
    }
    return data;
  }

  extractDataFromLobby(lobby: LobbyDTO): [LobbyDTO, PlayerDTO[]] {
    const data: [LobbyDTO, PlayerDTO[]] = [null, []];
    data[0] = lobby;
    for (const lobbyPlayer of lobby.players) {
      data[1].push(lobbyPlayer.player);
    }
    return data;
  }
}
