import {Component, OnInit} from '@angular/core';
import {AuthManagerService} from '../../services/auth-manager.service';
import {Router} from '@angular/router';
import {v4 as uuid} from 'uuid';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserManagerService} from '../../services/user-manager.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  guestForm: FormGroup;
  isLoading = false;
  hasFailed = false;
  failInfo = '';

  constructor(private formBuilder: FormBuilder,
              private userManager: UserManagerService,
              private router: Router,
              private authManager: AuthManagerService) {
  }

  ngOnInit() {
    if (this.authManager.isLoggedIn) {
      this.router.navigate(['jorcr']);
    }
  }

  onGuestClick() {
    this.isLoading = true;
    this.guestForm = this.formBuilder.group({
      email: [''],
      nickname: ['gosc' + uuid(), Validators.required],
      password: ['123', Validators.required],
      id: [0]
    });
    this.userManager.registerPlayer(this.guestForm.value).subscribe(
      next => {
        this.hasFailed = false;
        this.authManager.login(this.guestForm.value['nickname'], this.guestForm.value['password'], this.userManager, this.router);
      },
      err => {
        this.isLoading = false;
        this.hasFailed = true;
        this.failInfo = err.error;
      },
      () => this.isLoading = false
    );
  }
}
