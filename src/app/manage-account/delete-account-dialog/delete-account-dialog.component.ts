import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.scss']
})
export class DeleteAccountDialogComponent implements OnInit {

  password = new FormControl(null);
  isDeleting: boolean;

  constructor(
    public dialogRef: MatDialogRef<DeleteAccountDialogComponent>,
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
  }

  onDelete(): void {
    this.isDeleting = true;
    this.userService.delete(this.password.value, this.sessionService.getUser()).subscribe(
      () => {
        this.sessionService.removeSession();
        this.dialogRef.close();
        this.snackBar.open('Account was deleted successfully', null, {duration: 1500 });
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        this.isDeleting = false;
        if (error.status === 401) {
          switch(error.error?.code) {
            case 'pass':
            case 'badCredentials':
              this.password.setErrors({incorrect: true});
              break;
            default:
              console.log(error);
              this.snackBar.open('An error occured while deleting the account. Please try again later.', null, {duration: 4000});
              this.dialogRef.close();
              break;
          }
        } else {
          this.snackBar.open('An error occured while deleting the account. Please try again later.', null, {duration: 4000});
          console.log(error);
          this.dialogRef.close();
        }
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
