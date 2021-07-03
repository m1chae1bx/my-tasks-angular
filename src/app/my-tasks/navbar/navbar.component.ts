import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeleteAccountDialogComponent } from 'src/app/manage-account/delete-account-dialog/delete-account-dialog.component';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: User;
  @Output() done = new EventEmitter();

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();
  }

  logout(): void {
    this.auth.logout();
  }

  edit(): void {
    console.log('current url', this.router.url);
    this.router.navigate(['/manage-account/edit'], { queryParams: {backUrl: this.router.url}});
  }

  openDeleteDialog(): void {
    this.done.emit();
    this.dialog.open(DeleteAccountDialogComponent, {
      width: '400px'
    });
  }

}
