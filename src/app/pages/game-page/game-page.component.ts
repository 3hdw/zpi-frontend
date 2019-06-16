import {Component, OnInit} from '@angular/core';
import {Letter} from '../../models/Letter';
import {GameManagerService} from '../../services/game-manager.service';
import {ShareDataService} from '../../services/share-data.service';
import {GameDTO} from '../../models/api/GameDTO';
import {Subscription} from 'rxjs';
import {WebSocketService} from '../../services/web-socket.service';
import {SocketMessage} from '../../models/api/SocketMessage';
import {AuthManagerService} from '../../services/auth-manager.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  private game: GameDTO = null;
  private subscription: Subscription;
  private init = -1;
  turnName = '';

  points: Map<string, number> = new Map<string, number>();

  constructor(public gameManager: GameManagerService,
              private shareDataService: ShareDataService,
              private socketService: WebSocketService,
              private authManager: AuthManagerService,
              private router: Router) {
  }

  ngOnInit() {
    this.game = this.shareDataService.game;
    this.gameManager.gameName = this.game.name;
    this.gameManager.initGame(this.game, this.points);
    this.turnName = this.gameManager.getTurnName(this.game);
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
      console.log('TO DOSTAJE PO WYKONANIU RUCHU: ', socketMessage);
      const socketMsg: SocketMessage = JSON.parse(socketMessage);
      if (this.init !== -1) {
        this.gameManager.updateGame(socketMsg.body, this.points);
        this.turnName = this.gameManager.getTurnName(socketMsg.body);
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

  onQuit() {
    this.subscription.unsubscribe();
    this.socketService.onDestroy();
    this.socketService = null;
    this.router.navigate(['menu']);
  }

  canDeactivate() {
    return false;
  }
}
