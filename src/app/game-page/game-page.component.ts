import {Component, OnInit} from '@angular/core';
import {FetchDataService} from '../fetch-data.service';
import {Letter} from '../models/Letter';
import {GameManagerService} from '../game-manager.service';

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
    if (this.gameManager.wasCoorectDraggable) {
      if (this.gameManager.gameBoard[i][j] == null) {
        this.gameManager.wasCorrectMove = true;
      }
      dropSpot.className = 'drop-spot';
    }
  }

  onDragOver(event, dropSpot, i, j) {
    event.preventDefault();
    if (this.gameManager.wasCoorectDraggable) {
      if (this.gameManager.gameBoard[i][j] != null) {
        dropSpot.className = dropSpot.className + ' wrong';
      }
    }
  }

  onDragEnter(event, dropSpot, i, j) {
    event.preventDefault();
    if (this.gameManager.wasCoorectDraggable) {
      if (this.gameManager.gameBoard[i][j] == null) {
        dropSpot.className += ' over';
      } else {
        dropSpot.className += ' wrong';
      }
    }
  }

  onDragLeave(event, dropSpot, i, j) {
    if (this.gameManager.wasCoorectDraggable) {
      dropSpot.className = 'drop-spot';
    }
  }
}
