import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  registerForm: FormGroup;
  fullName = new FormControl(null);
  nickname = new FormControl(null);
  email = new FormControl(null);
  username = new FormControl(null);
  password = new FormControl(null);
  confirmPass = new FormControl(null);

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
    console.log('Form submitted', this.registerForm);
    this.userService.register();
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

}
