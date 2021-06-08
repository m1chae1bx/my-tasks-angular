import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { StartComponent } from './start.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    LandingComponent,
    StartComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule
  ]
})
export class StartModule { }
