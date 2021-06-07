import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, EditAccountPayload, User } from 'src/app/services/auth.service';
import { fade } from 'src/app/utilities/animations';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],
  animations: [fade]
})
export class EditAccountComponent implements OnInit {

  backUrl: string;
  editForm: FormGroup;
  fullName = new FormControl(null);
  nickname = new FormControl(null);
  email = new FormControl({value: '', disabled: true});
  username = new FormControl({value: '', disabled: true});
  isSaving: boolean;
  user: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.backUrl = params.backUrl;
      console.log('params', params);
    })
    this.editForm = new FormGroup({
      'fullName': this.fullName,
      'nickname': this.nickname,
      'email': this.email,
      'username': this.username,
    });
    this.user = this.auth.getUser();
    this.fullName.setValue(this.user.fullname);
    this.nickname.setValue(this.user.nickname);
    this.email.setValue(this.user.email);
    this.username.setValue(this.user.username);
  }

  onSubmit(): void {
    this.isSaving = true;
    const payload: EditAccountPayload = {
      fullName: this.fullName.value,
      nickname: this.nickname.value
    };
    this.auth.editAccount(payload).subscribe(
      response => {
        this.isSaving = false;
        console.log('yey', response); // @todo
        this.snackBar.open('Your account has been updated successfully.', null, {duration: 1500});
      },
      error => {
        this.isSaving = false;
        // @todo
        this.snackBar.open('An error occured while creating the account. Please try again later.', null, {duration: 4000});
        console.log(error);
      }
    )
  }

  trim(control: string): void {
    switch(control) {
      case 'fullName':
        this.fullName.setValue(this.fullName.value?.trim());
        break;
      case 'nickname':
        this.nickname.setValue(this.nickname.value?.trim());
        break;
      default:
        break;
    }
  }
}
