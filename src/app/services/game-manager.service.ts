import {Injectable} from '@angular/core';
import {FetchDataService} from './fetch-data.service';
import {Letter} from '../models/Letter';
import {Pair} from '../models/Pair';
import {GameDTO} from '../models/api/GameDTO';
import {AuthManagerService} from './auth-manager.service';
import {PlayerStateDTO} from '../models/api/PlayerStateDTO';
import {UtilsService} from './utils.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {nextTick} from 'q';

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
  isAi: boolean;
  isWaitingForAi = false;
  aiMoved = true;

  constructor(private fetchDataService: FetchDataService,
              private authManager: AuthManagerService,
              private utils: UtilsService,
              private _snackBar: MatSnackBar) {
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

  hint() {
    this.isWaitingForAi = true;
    this.fetchDataService.getHint(this.gameName).subscribe(
      next => {
        this.isWaitingForAi = false;
        Object.keys(next).forEach(
          key => {
            const x: number = +key.substr(1) - 1;
            const y: number = key.charCodeAt(0) - 65;
            let tempLetter = null;
            for (let i = 0; i < this.letterPool.length; i++) {
              if (this.letterPool[i].character === next[key]) {
                tempLetter = this.letterPool[i];
                this.letterPool[i] = null;
                this.unconfirmedLetters.push(tempLetter);
                this.unconfirmedCords.push({first: y, second: x});
                this.gameBoard[y][x] = tempLetter;
                break;
              }
            }
          }
        );
      },
      error1 => {
        this.isWaitingForAi = false;
        console.log('ERROR GETTING HINT: ', error1);
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
        this.aiMoved = false;
        this.unconfirmedLetters = [];
        this.unconfirmedCords = [];
        this.openSnackBar(next.players.find(playerState => playerState.player.nickname === this.authManager.userName).lastMovePoints);
      },
      err => {
        console.log('MAKE MOVE ERROR: ', err);
        this.openErrorSnackBar('Wykonano niedozwolony ruch!');
      },
      () => {
      }
    );
  }

  aiMove() {
    this.aiMoved = true;
  }

  swap() {
    const characters = [];
    this.letterPool.forEach(e => {
      if (e !== null) {
        characters.push(e.character);
      }
    });
    if (characters.length === 7) {
      this.fetchDataService.swapLetters(this.gameName, characters).subscribe(
        next => {
          this.aiMoved = false;
        },
        err => {
          console.log('ERROR SWAPING LETTERS', err);
        },
        () => {

        }
      );
    } else {
      this.openErrorSnackBar('Przed zmianą trzeba zdjąć litery z planszy!');
    }
  }

  openSnackBar(points: number) {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    config.verticalPosition = 'top';
    config.panelClass = 'snackBar';
    this._snackBar.open('Gratulacje! Zdobywasz: ' + points + ' punktów!', 'X', config);
  }

  openErrorSnackBar(msg: string) {
    const config = new MatSnackBarConfig();
    config.duration = 8000;
    config.verticalPosition = 'top';
    config.panelClass = 'errorSnackBar';
    this._snackBar.open(msg, 'X', config);
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
