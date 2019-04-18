import {Component, Input, OnInit} from '@angular/core';
import {Letter} from '../../models/Letter';

@Component({
  selector: 'app-scrabble-block',
  templateUrl: './scrabble-block.component.html',
  styleUrls: ['./scrabble-block.component.css']
})
export class ScrabbleBlockComponent implements OnInit {

  @Input() letter: Letter = null;

  constructor() {
  }

  ngOnInit() {
  }

}
