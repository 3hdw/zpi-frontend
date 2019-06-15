import {Component, OnInit} from '@angular/core';
import {Letter} from '../../models/Letter';
import {GameManagerService} from '../../services/game-manager.service';
import {ShareDataService} from '../../services/share-data.service';
import {GameDTO} from '../../models/api/GameDTO';
import {FetchDataService} from '../../services/fetch-data.service';
import {AuthManagerService} from '../../services/auth-manager.service';
import {Subscription} from 'rxjs';
import {WebSocketService} from '../../services/web-socket.service';
import {SocketMessage} from '../../models/api/SocketMessage';
import {init} from 'protractor/built/launcher';
import {EnemyPoints} from '../../models/EnemyPoints';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  private game: GameDTO = null;
  isMyMove = false;
  private subscription: Subscription;
  private init = -1;

  points: Map<string, number> = new Map<string, number>();

  constructor(public gameManager: GameManagerService,
              private shareDataService: ShareDataService,
              private socketService: WebSocketService) {
  }

  onMove() {
    this.gameManager.move(this.game);
  }

  ngOnInit() {
    this.game = this.shareDataService.game;
    this.gameManager.initGame(this.game, this.points);
    this.isMyMove = this.gameManager.isMyMove(this.game);
    this.initSocketConnection();
  }

  private initSocketConnection() {
    this.socketService.connectToGameSocket(this.game.name);
    this.subscription = this.socketService.socketMessage$.subscribe(
      socketMessage => this.handleSocketMessage(socketMessage)
    );

  }

  private handleSocketMessage(socketMessage: string) {
    if (socketMessage) {
      console.log('socket message fst', socketMessage);
      const socketMsg: SocketMessage = JSON.parse(socketMessage);
      this.isMyMove = this.gameManager.isMyMove(socketMsg.body);
      if (this.init !== -1) {
        this.gameManager.updateGame(socketMsg.body, this.points);
      } else {
        this.init = 1;
      }
    }
  }

  onDrop(event, dropSpot, i, j) {
    const scrabbleBlock = JSON.parse(event.dataTransfer.getData('scrabbleBlock'));
    if (this.gameManager.checkDraggable()) {
      if (this.gameManager.gameBoard[i][j] === null) {
        this.gameManager.gameBoard[i][j] = new Letter(scrabbleBlock._character);
        this.gameManager.addUnconfirmedCord({first: i, second: j});
      }
      dropSpot.className = 'drop-spot';
    }
  }

  onDragOver(event, dropSpot, i, j) {
    event.preventDefault();
    if (this.gameManager.checkDraggable()) {
      if (this.gameManager.gameBoard[i][j] != null) {
        dropSpot.className = dropSpot.className + ' wrong';
        event.dataTransfer.dropEffect = 'none';
      } else {
        event.dataTransfer.dropEffect = 'move';
      }
    }
  }

  onDragEnter(event, dropSpot, i, j) {
    if (this.gameManager.checkDraggable()) {
      if (this.gameManager.gameBoard[i][j] == null) {
        dropSpot.className += ' over';
      } else {
        dropSpot.className += ' wrong';
      }
    }
  }

  onDragLeave(event, dropSpot, i, j) {
    if (this.gameManager.checkDraggable()) {
      dropSpot.className = 'drop-spot';
    }
  }
}
