import {Component, OnInit} from '@angular/core';
import {AuthManagerService} from '../../services/auth-manager.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  constructor(public authManager: AuthManagerService, private router: Router) {
  }

  ngOnInit() {
    if (this.authManager.isLoggedIn) {
      this.router.navigate(['jorcr']);
    }
  }
}
