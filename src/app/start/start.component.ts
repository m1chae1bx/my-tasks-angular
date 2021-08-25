import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private sessionService: SessionService
  ) {
    console.log('Verifying session...');
    
    this.sessionService.isLoggedIn().subscribe(
      response => {
        if (response) {
          this.router.navigate(['/my-tasks']);
        } else {
          this.router.navigate(['/login'])
        }
      }
    );
  }

  ngOnInit(): void {
  }
}
