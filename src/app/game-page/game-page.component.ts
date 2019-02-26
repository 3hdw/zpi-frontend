import {Component, OnInit} from '@angular/core';
import {FetchDataService} from '../fetch-data.service';
import {Letter} from '../models/Letter';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  gameState: Letter [][] = [];

  constructor(private fetchService: FetchDataService) {
  }

  ngOnInit() {
    this.initGameState();
  }

  initGameState() {
    this.fetchService.getMockGameState().subscribe(
      data => this.gameState = data
    );
  }

  onDrop(event, dropSpot, i, j) {
    console.log('drop');
    dropSpot.className = 'dropSpot';
  }

  onDragOver(event, dropSpot, i, j) {
    event.preventDefault();
  }

  onDragEnter(event, dropSpot, i, j) {
    event.preventDefault();
    dropSpot.className += ' over';
  }

  onDragLeave(event, dropSpot, i, j) {
    dropSpot.className = 'drop-spot';
  }

}
