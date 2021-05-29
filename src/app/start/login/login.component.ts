import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  loginFormGroup: FormGroup;
  emailOrUsername = new FormControl(null);
  password = new FormControl(null);

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      'emailOrUsername': this.emailOrUsername,
      'password': this.password
    });
  }

  navToRegister(): void {
    this.router.navigate(['/register'])
  }

  navToForgotPass(): void {
    this.snackBar.open('This functionality is not yet implemented.', null, {duration: 2000});
  }

}
