import {Component, OnInit} from '@angular/core';
import {UserManagerService} from '../../services/user-manager.service';
import {AuthManagerService} from '../../services/auth-manager.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {v4 as uuid} from 'uuid';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  isLoading = false;
  hasFailed = false;
  loginForm: FormGroup;
  guestForm: FormGroup;
  failInfo = '';


  constructor(private formBuilder: FormBuilder,
              private authManager: AuthManagerService,
              private userManager: UserManagerService,
              private router: Router) {
  }

  ngOnInit() {
    this.buildForm();
    this.authManager.loginEmitter.subscribe(
      result => {
        if (result.hasFinished) {
          this.isLoading = false;
        }
        this.hasFailed = result.hasFailed;
      }
    );
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    this.isLoading = true;
    this.authManager.login(this.loginForm.value['login'], this.loginForm.value['password'], this.userManager, this.router);
  }

  onGuest() {
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
