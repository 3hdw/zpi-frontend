import {Injectable} from '@angular/core';
import {FetchDataService} from './fetch-data.service';
import {Letter} from '../models/Letter';
import {Pair} from '../models/Pair';
import {GameDTO} from '../models/api/GameDTO';
import {AuthManagerService} from './auth-manager.service';
import {PlayerStateDTO} from '../models/api/PlayerStateDTO';
import {UtilsService} from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {
  gameBoard: Letter[][] = [];
  letterPool: Letter[] = [];
  private unconfirmedLetters: Letter[] = [];
  private unconfirmedCords: Pair<number>[] = [];
  private isCorrectDraggable = false;

  constructor(private fetchDataService: FetchDataService,
              private authManager: AuthManagerService,
              private utils: UtilsService) {
  }

  gameBoardToMap() {
    const map: Map<string, string> = new Map<string, string>();
    for (let i = 0; i < this.gameBoard.length; i++) {
      for (let j = 0; j < this.gameBoard[i].length; j++) {
        map.set(String.fromCharCode(65 + i).concat((j + 1).toString()),
          this.gameBoard[i][j] !== null ? this.gameBoard[i][j].character : '');
      }
    }
    return map;
  }

  mapToGameBoard() {

  }

  initGame(game: GameDTO) {
    this.initBoard();
    this.initPool(this.utils.charactersToLetters(this.getThisPlayer(game).characters));
  }

  private getThisPlayer(game: GameDTO): PlayerStateDTO {
    return game.players.find(playerState => playerState.player.nickname === this.authManager.userName);
  }

  initBoard() {
    this.gameBoard = [
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
    ];
  }

  initPool(letters: Letter[]) {
    this.letterPool = letters;
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

  move(game: GameDTO) {
    this.fetchDataService.makeMove(game.name, this.gameBoardToMap());
  }

  isMyMove(game: GameDTO) {
    let isMyMove = false;
    for (let i = 0; i < game.players.length; i++) {
      if (game.players[i].player.nickname === this.authManager.userName) {
        if (game.nextPlayer === i) {
          isMyMove = true;
          break;
        }
      }
    }
    return isMyMove;
  }
}
