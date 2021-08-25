import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeleteAccountDialogComponent } from 'src/app/manage-account/delete-account-dialog/delete-account-dialog.component';
import { SessionService } from 'src/app/services/session.service';
import { User } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: User;
  @Output() done = new EventEmitter();

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
  }

  logout(): void {
    this.sessionService.logout();
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
