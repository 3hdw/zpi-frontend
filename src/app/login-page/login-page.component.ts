import {Component, OnInit} from '@angular/core';
import {UserManagerService} from '../user-manager.service';
import {AuthManagerService} from '../auth-manager.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  isLoading = false;
  hasFailed = false;
  loginForm: FormGroup;

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
}
