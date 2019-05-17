import {Injectable} from '@angular/core';
import {FetchDataService} from './fetch-data.service';
import {Letter} from '../models/Letter';
import {Pair} from '../models/Pair';

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {
  gameBoard: Letter[][] = [];
  letterPool: Letter[] = [];
  private unconfirmedLetters: Letter[] = [];
  private unconfirmedCords: Pair<number>[] = [];
  private isCorrectDraggable = false;

  constructor(private fetchDataService: FetchDataService) {
  }

  gameBoardToMap() {
    const map: Map<string, string> = new Map<string, string>();
    for (let i = 0; i < this.gameBoard.length; i++) {
      for (let j = 0; j < this.gameBoard[i].length; j++) {
        map.set(String.fromCharCode(65 + i).concat((j + 1).toString()), this.gameBoard[i][j] !== null ? this.gameBoard[i][j].character : '');
      }
    }
    return map;
  }

  initBoard() {
    this.fetchDataService.getMockGameState().subscribe(
      data => this.gameBoard = data
    );
  }

  initPool() {
    this.fetchDataService.getMockLetterPool().subscribe(
      data => {
        this.letterPool = data;
      }
    );
  }

  checkDraggable(): boolean {
    return this.isCorrectDraggable;
  }

  setCorrectDraggable(isCorrect: boolean) {
    this.isCorrectDraggable = isCorrect;
  }

  resetUnconfirmed() {
    this.unconfirmedLetters = [];
    for (const pair of this.unconfirmedCords) {
      this.gameBoard[pair.first][pair.second] = null;
    }
    this.unconfirmedCords = [];
  }

  getUnconfirmedBlocks(): Letter[] {
    return this.unconfirmedLetters;
  }

  addUnconfirmedBlock(letter: Letter) {
    this.unconfirmedLetters.push(letter);
  }

  addUnconfirmedCord(pair: Pair<number>) {
    this.unconfirmedCords.push(pair);
  }
}
