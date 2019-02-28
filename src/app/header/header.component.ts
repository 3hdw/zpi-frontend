import {Component, OnInit} from '@angular/core';
import {Letter} from '../models/Letter';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  test: Letter[][] = [
    [new Letter('S'), new Letter('C'), new Letter('R'), new Letter('A'),
      new Letter('B'), new Letter('B'), new Letter('L'), new Letter('E')],
    [new Letter('O'), new Letter('N'), new Letter('L'), new Letter('I'),
      new Letter('N'), new Letter('E')]
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
