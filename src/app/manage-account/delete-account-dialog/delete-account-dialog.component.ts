import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onDelete(): void {
    this.isDeleting = true;
    this.auth.deleteAccount(this.password.value).subscribe(
      () => {
        this.auth.removeSession();
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
