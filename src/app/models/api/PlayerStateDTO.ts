import {PlayerDTO} from './PlayerDTO';

export class PlayerStateDTO {
  constructor(private _player: PlayerDTO,
              private _totalPoints: number,
              private _lastMovePoints: number,
              private _characters: string[]) {
  }

  get player(): PlayerDTO {
    return this._player;
  }

  get totalPoints(): number {
    return this._totalPoints;
  }

  get lastMovePoints(): number {
    return this._lastMovePoints;
  }

  get characters(): string[] {
    return this._characters;
  }
}
