import {Component, Input, OnInit} from '@angular/core';
import {FetchDataService} from '../../services/fetch-data.service';
import {Letter} from '../../models/Letter';
import {GameManagerService} from '../../services/game-manager.service';
import {AuthManagerService} from '../../services/auth-manager.service';

@Component({
  selector: 'app-game-panel',
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.css']
})
export class GamePanelComponent implements OnInit {

  @Input() points: Map<string, number>;
  @Input() turnName: string;

  constructor(public gameManager: GameManagerService, public authManager: AuthManagerService) {

  }

  ngOnInit() {
  }

  dragStart(event, block, item: Letter) {
    this.gameManager.setCorrectDraggable(true);
    setTimeout(() => block.className = 'hidden', 0);
    event.dataTransfer.setData('scrabbleBlock', JSON.stringify(item));
  }

  dragEnd(event, block, i) {
    this.gameManager.setCorrectDraggable(false);
    if (event.dataTransfer.dropEffect === 'none') {
      block.className = 'visible';
    } else {
      this.gameManager.addUnconfirmedBlock(this.gameManager.letterPool[i]);
      this.gameManager.letterPool[i] = null;
    }
  }

  reset() {
    for (let i = 0; i < this.gameManager.letterPool.length; i++) {
      if (this.gameManager.letterPool[i] === null) {
        const block = this.gameManager.getUnconfirmedBlocks().pop();
        block ? this.gameManager.letterPool[i] = block : console.log('przypal z resetem');
      }
    }
    if (this.gameManager.getUnconfirmedBlocks().length !== 0) {
      console.log('przypal z resetem');
    } else {
      this.gameManager.resetUnconfirmed();
    }
  }

  onMove() {
    this.gameManager.move();
  }

  onSwap(){
    this.gameManager.swap();
  }
}
