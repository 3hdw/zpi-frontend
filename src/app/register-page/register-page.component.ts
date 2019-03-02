import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserManagerService} from '../user-manager.service';
import {Router} from '@angular/router';

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
              private router: Router) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      email: [''],
      nickname: [],
      password: [],
      id: [0]
    });
  }

  onRegister() {
    this.isLoading = true;
    this.userManager.registerPlayer(this.registerForm.value).subscribe(
      next => {
        this.hasFailed = false;
        this.router.navigate(['/home']);
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
