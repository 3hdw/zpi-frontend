import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FetchDataService} from '../../services/fetch-data.service';
import {AuthManagerService} from '../../services/auth-manager.service';
import {ShareDataService} from '../../services/share-data.service';

@Component({
  selector: 'app-join-or-create-page',
  templateUrl: './join-or-create-page.component.html',
  styleUrls: ['./join-or-create-page.component.css']
})
export class JoinOrCreatePageComponent implements OnInit {
  isLoading = false;

  constructor(private router: Router,
              private fetchDataService: FetchDataService,
              private authManager: AuthManagerService,
              private shareDataService: ShareDataService) {
  }

  ngOnInit() {
  }

  onPlayVsAi() {
    this.isLoading = true;
    this.fetchDataService.createLobby().subscribe(
      next => {
        this.fetchDataService.addAi(next.name).subscribe(
          next2 => {
            this.fetchDataService.startLobby(next.name).subscribe(
              next1 => {
                this.isLoading = false;
                this.shareDataService.game = next1;
                this.router.navigate(['playAi/ai']);
              },
              error1 => {
                this.isLoading = false;
                console.log('ERROR STARTING LOBBBY - AI', error1);
              }
            );

          },
          error2 => {
            this.isLoading = false;
            console.log('ERROR ADDING AI', error2);
          }
        );
      },
      error => {
        this.isLoading = false;
        console.log('ERROR CREATING LOBBY - AI', error);
      }
    );
  }
}
