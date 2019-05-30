  import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserManagerService} from '../../services/user-manager.service';
import {Router} from '@angular/router';
import {AuthManagerService} from '../../services/auth-manager.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerForm: FormGroup;
  isLoading = false;
  hasFailed = false;
  failInfo = '';

  constructor(private formBuilder: FormBuilder,
              private userManager: UserManagerService,
              private router: Router,
              private authManager: AuthManagerService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      email: [''],
      nickname: ['', Validators.required],
      password: ['', Validators.required],
      id: [0]
    });
  }

  onRegister() {
    this.isLoading = true;
    this.userManager.registerPlayer(this.registerForm.value).subscribe(
      next => {
        this.hasFailed = false;
        this.authManager.login(this.registerForm.value['nickname'], this.registerForm.value['password'], this.userManager, this.router);
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
