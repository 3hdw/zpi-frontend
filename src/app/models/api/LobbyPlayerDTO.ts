import {PlayerDTO} from './PlayerDTO';

export class LobbyPlayerDTO {
  constructor(private _player: PlayerDTO) {
  }

  get player(): PlayerDTO {
    return this._player;
  }
}
