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

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  private game: GameDTO = null;
  isMyMove = false;
  private subscription: Subscription;

  constructor(public gameManager: GameManagerService,
              private shareDataService: ShareDataService,
              private socketService: WebSocketService) {
  }

  onMove() {
    this.gameManager.move(this.game);
  }

  ngOnInit() {
    this.game = this.shareDataService.game;
    console.log('gameObj', this.game);
    this.gameManager.initGame(this.game);
    this.isMyMove = this.gameManager.isMyMove(this.game);
    this.socketService.connectToGameSocket(this.game.name);
    this.subscription = this.socketService.socketMessage$.subscribe(
      socketMessage => this.check(socketMessage)
    );
  }

  private check(socketMessage: string) {
    if (socketMessage) {
      const socketMsg: SocketMessage = JSON.parse(socketMessage);
      console.log('header', socketMsg.header);
      console.log('body', socketMsg.body);
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
