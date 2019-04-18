import {LobbyPlayerDTO} from './LobbyPlayerDTO';

export class LobbyDTO {
  constructor(private _name: string, private _players: LobbyPlayerDTO[]) {
  }

  get name(): string {
    return this._name;
  }

  get players(): LobbyPlayerDTO[] {
    return this._players;
  }
}
