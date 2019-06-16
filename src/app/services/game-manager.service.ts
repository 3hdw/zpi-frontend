import {Injectable} from '@angular/core';
import {FetchDataService} from './fetch-data.service';
import {Letter} from '../models/Letter';
import {Pair} from '../models/Pair';
import {GameDTO} from '../models/api/GameDTO';
import {AuthManagerService} from './auth-manager.service';
import {PlayerStateDTO} from '../models/api/PlayerStateDTO';
import {UtilsService} from './utils.service';
import {EnemyPoints} from '../models/EnemyPoints';

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {
  gameBoard: Letter[][] = [];
  letterPool: Letter[] = [];
  private unconfirmedLetters: Letter[] = [];
  private unconfirmedCords: Pair<number>[] = [];
  private isCorrectDraggable = false;
  gameName = '';

  constructor(private fetchDataService: FetchDataService,
              private authManager: AuthManagerService,
              private utils: UtilsService) {
  }

  gameBoardToMap() {
    const map: Map<string, string> = new Map<string, string>();
    for (let i = 0; i < this.gameBoard.length; i++) {
      for (let j = 0; j < this.gameBoard[i].length; j++) {
        if (this.gameBoard[i][j] !== null) {
          map.set(String.fromCharCode(65 + i).concat((j + 1).toString()),
            this.gameBoard[i][j].character);
        }
      }
    }
    return map;
  }

  initGame(game: GameDTO, points: Map<string, number>) {
    this.initBoard();
    this.initPool(this.utils.charactersToLetters(this.getThisPlayer(game).characters));
    this.initPoints(game, points);
  }

  initPoints(game: GameDTO, points: Map<string, number>) {
    for (const playerState of game.players) {
      points.set(playerState.player.nickname, playerState.totalPoints);
    }
  }

  updateGame(game: GameDTO, points: Map<string, number>) {
    this.updateBoardState(game.boardState);
    this.initPool(this.utils.charactersToLetters(this.getThisPlayer(game).characters));
    this.initPoints(game, points);
  }

  updateBoardState(boardStateMap) {
    this.initBoard();
    Object.keys(boardStateMap).forEach(
      key => {
        this.gameBoard[key.charCodeAt(0) - 65][+key.substr(1) - 1] = new Letter(boardStateMap[key]);
      }
    );
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

  move() {
    this.fetchDataService.makeMove(this.gameName, this.buildMove()).subscribe(
      next => {
        this.unconfirmedLetters = [];
        this.unconfirmedCords = [];
      },
      error => console.log('MAKE MOVE ERROR: ', error),
      () => {
      }
    );
  }

  buildMove(): Map<string, string> {
    const move: Map<string, string> = new Map<string, string>();
    for (let i = 0; i < this.unconfirmedCords.length; i++) {
      move.set(String.fromCharCode(65 + this.unconfirmedCords[i].first).concat((this.unconfirmedCords[i].second + 1).toString())
        , this.unconfirmedLetters[i].character);
    }
    console.log('ZBUDOWANY MOVE: ', move);
    return move;
  }

  isMyMove(game: GameDTO) {
    return game.nextPlayerName === this.authManager.userName;
  }


  getTurnName(game: GameDTO): string {
    return game.nextPlayerName;
  }
}
