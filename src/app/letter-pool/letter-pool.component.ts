import {Component, OnInit} from '@angular/core';
import {FetchDataService} from '../fetch-data.service';
import {Letter} from '../models/Letter';
import {GameManagerService} from '../game-manager.service';

@Component({
  selector: 'app-letter-pool',
  templateUrl: './letter-pool.component.html',
  styleUrls: ['./letter-pool.component.css']
})
export class LetterPoolComponent implements OnInit {

  constructor(public gameManager: GameManagerService) {

  }

  ngOnInit() {
    this.gameManager.initPool();
  }

  dragStart(event, block, i, item) {
    this.gameManager.wasCoorectDraggable = true;
    setTimeout(() => block.className = 'hidden', 0);
  }

  dragEnd(event, block, i, item: Letter) {
    this.gameManager.wasCoorectDraggable = false;
    if (!this.gameManager.checkMove()) {
      block.className = 'visible';
    }
  }
}
