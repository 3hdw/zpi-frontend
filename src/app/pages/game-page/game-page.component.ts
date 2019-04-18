import {Component, OnInit} from '@angular/core';
import {FetchDataService} from '../../services/fetch-data.service';
import {Letter} from '../../models/Letter';
import {GameManagerService} from '../../services/game-manager.service';
import {Pair} from '../../models/Pair';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  constructor(public gameManager: GameManagerService) {
  }

  ngOnInit() {
    this.gameManager.initBoard();
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
