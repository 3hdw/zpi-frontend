import {PlayerStateDTO} from './PlayerStateDTO';

export class GameDTO {
  constructor(private _players: PlayerStateDTO[],
              private _boardState: Map<string, string>,
              private _nextPlayer: number,
              private _name: string) {
  }

  get players(): PlayerStateDTO[] {
    return this._players;
  }

  get boardState(): Map<string, string> {
    return this._boardState;
  }

  get nextPlayer(): number {
    return this._nextPlayer;
  }

  get name(): string {
    return this._name;
  }
}
