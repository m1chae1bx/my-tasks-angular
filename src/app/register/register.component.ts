import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, RegisterPayload } from 'src/app/services/auth.service';
import { fade } from 'src/app/utilities/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fade]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  fullName = new FormControl(null);
  nickname = new FormControl(null);
  email = new FormControl(null);
  username = new FormControl(null);
  password = new FormControl(null);
  confirmPass = new FormControl(null);
  isSaving: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { 
    if (this.auth.isLoggedIn()) {
      this.snackBar.open('Redirecting to My Tasks...', null, {duration: 2000});
      this.router.navigate(['/my-tasks']);
    }
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'fullName': this.fullName,
      'nickname': this.nickname,
      'email': this.email,
      'username': this.username,
      'password': this.password,
      'confirmPass': this.confirmPass
    }, this.compare('password', 'confirmPass'));
  }

  // Currently not used
  // getErrorCount(ctrl: FormControl): number {
  //   return Object.keys(ctrl.errors).length;
  // }

  onSubmit(): void {
    //@todo: Trim all whitespace in data before sending request

    this.isSaving = true;
    console.log('Form submitted');
    const payload: RegisterPayload = {
      username: this.username.value,
      password: this.password.value,
      email: this.email.value,
      fullName: this.fullName.value,
      nickname: this.nickname.value,
    };
    this.auth.register(payload).subscribe(
      response => {
        console.log(response);
        this.snackBar.open('Signed up successfully', null, {duration: 2000});
        this.router.navigate(['/welcome']);
      },
      error => {
        this.isSaving = false;
        if (error.status === 409) {
          console.log(error);
          switch(error.error?.code) {
            case 'usernameUnavailable':
              this.username.setErrors({unavailable: true});
              break;
            case 'emailUnavailable':
              this.email.setErrors({unavailable: true});
              break;
            default:
              console.log(error);
              this.snackBar.open('An error occured while signing in. Please try again later.', null, {duration: 4000});
              break;
          }
        } else {
          this.snackBar.open('An error occured while creating the account. Please try again later.', null, {duration: 4000});
          console.log(error);
        }
      }
    );
  }

  navToLogin(): void {
    this.router.navigate(['/login']);
  }

  compare(control1Name: string, control2Name: string): ValidatorFn { // @todo: move to a shared directive/component?
    return (group: FormGroup): ValidationErrors | null => {
      const control1 = group.get(control1Name);
      const control2 = group.get(control2Name);
      if (control1.value !== control2.value) {
        control2.setErrors({notEqual: true})
      }
      return;
    };
  }

  trim(control: string): void {
    switch(control) {
      case 'fullName':
        this.fullName.setValue(this.fullName.value?.trim());
        break;
      case 'nickname':
        this.nickname.setValue(this.nickname.value?.trim());
        break;
      case 'username':
        this.username.setValue(this.username.value?.trim());
        break;
      case 'email':
        this.email.setValue(this.email.value?.trim());
        break;
      default:
        break;
    }
  }

}
