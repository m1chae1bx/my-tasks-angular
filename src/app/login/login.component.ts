import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService, LoginPayload } from 'src/app/services/auth.service';
import { fade } from 'src/app/utilities/animations';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fade]
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private auth: AuthService,
    private sessionService: SessionService
  ) { 
    this.sessionService.isLoggedIn().subscribe(
      response => {
        if (response) {
          this.snackBar.open('Redirecting to My Tasks...', null, {duration: 2000});
          this.router.navigate(['/my-tasks']);
        }
      }
    );
  }

  loginFormGroup: FormGroup;
  username = new FormControl(null);
  password = new FormControl(null);
  isLoggingIn: boolean;

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      'username': this.username,
      'password': this.password
    });
  }

  navToRegister(): void {
    this.router.navigate(['/register'])
  }

  navToForgotPass(): void {
    this.snackBar.open('This functionality is not yet implemented.', null, {duration: 2000});
  }

  onSubmit(): void {
    this.isLoggingIn = true;
    const payload: LoginPayload = {
      username: this.username.value,
      password: this.password.value
    };
    this.sessionService.login(payload).subscribe(
      response => {
        console.log(response);
        this.snackBar.open('Signed in successfully', null, {duration: 1500});
        this.router.navigate(['/my-tasks']);
      },
      (error: HttpErrorResponse) => {
        this.isLoggingIn = false;
        if (error.status === 401) {
          switch(error.error?.code) {
            case 'user':
              this.username.setErrors({notFound: true});
              break;
            case 'pass':
              this.password.setErrors({incorrect: true});
              break;
            case 'badCredentials':
              this.username.setErrors({badCredentials: true});
              this.password.setErrors({badCredentials: true});
              break;
            default:
              console.log(error);
              this.snackBar.open('An error occured while signing in. Please try again later.', null, {duration: 4000});
              break;
          }
        } else {
          this.snackBar.open('An error occured while signing in. Please try again later.', null, {duration: 4000});
          console.log(error);
        }
      }
    )
  }

  trim(control: string): void {
    switch(control) {
      case 'username':
        this.username.setValue(this.username.value?.trim());
        break;
      default:
        break;
    }
  }

}
