import {Injectable} from '@angular/core';
import {GameDTO} from '../models/api/GameDTO';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private _game: GameDTO = null;

  constructor() {
  }

  get game(): GameDTO {
    return this._game;
  }

  set game(value: GameDTO) {
    this._game = value;
  }
}
