import {Component, OnInit} from '@angular/core';
import {FetchDataService} from '../fetch-data.service';
import {Letter} from '../models/Letter';

@Component({
  selector: 'app-letter-pool',
  templateUrl: './letter-pool.component.html',
  styleUrls: ['./letter-pool.component.css']
})
export class LetterPoolComponent implements OnInit {

  letterPool: Letter[] = [];

  constructor(private fetchService: FetchDataService) {

  }

  ngOnInit() {
    this.getLetterPool();
  }

  getLetterPool() {
    this.fetchService.getMockLetterPool().subscribe(
      data => this.letterPool = data
    );
  }

  dragStart(event, block, i, item) {
    setTimeout(() => block.className = 'hidden', 0);
  }

  dragEnd(event, block, i, item: Letter) {
    block.className = 'visible';
  }
}
