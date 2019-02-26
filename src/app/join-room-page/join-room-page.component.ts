import {Component, OnInit} from '@angular/core';
import {FetchDataService} from '../fetch-data.service';
import {MockRoom} from '../models/MockRoom';


@Component({
  selector: 'app-join-room-page',
  templateUrl: './join-room-page.component.html',
  styleUrls: ['./join-room-page.component.css']
})
export class JoinRoomPageComponent implements OnInit {

  rooms: MockRoom[];

  constructor(private fetchService: FetchDataService) {
  }

  ngOnInit() {
    this.fetchService.getMockRooms().subscribe(e => this.rooms = e);
  }

}
