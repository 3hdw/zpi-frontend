import {Injectable} from '@angular/core';
import {FetchDataService} from './fetch-data.service';
import {Letter} from './models/Letter';

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {

  gameBoard: Letter[][] = [];
  letterPool: Letter[] = [];

  private _wasCorrectMove = false;
  private _wasCoorectDraggable = false;

  constructor(private fetchDataSerivce: FetchDataService) {
  }

  initBoard() {
    this.fetchDataSerivce.getMockGameState().subscribe(
      data => this.gameBoard = data
    );
  }

  initPool() {
    this.fetchDataSerivce.getMockLetterPool().subscribe(
      data => this.letterPool = data
    );
  }


  set wasCorrectMove(value: boolean) {
    this._wasCorrectMove = value;
  }

  checkMove(): boolean {
    if (this._wasCorrectMove) {
      this._wasCorrectMove = false;
      return true;
    }
    return false;
  }

  set wasCoorectDraggable(value: boolean) {
    this._wasCoorectDraggable = value;
  }


  get wasCoorectDraggable(): boolean {
    return this._wasCoorectDraggable;
  }
}
