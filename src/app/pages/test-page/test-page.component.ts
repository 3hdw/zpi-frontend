import {Component, OnInit} from '@angular/core';
import {UserManagerService} from '../../services/user-manager.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';


@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  hard() {
  }

  openSnackBar(points: number) {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.verticalPosition = 'top';
    config.panelClass = 'snackBar';
    this._snackBar.open('Gratulacje! Zdobywasz: ' + points + ' punktów!', 'X', config);
  }
}
