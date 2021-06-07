import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteAccountDialogComponent } from './delete-account-dialog/delete-account-dialog.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToolbarModule } from 'src/app/shared/toolbar/toolbar.module';
import { MatCardModule } from '@angular/material/card';




@NgModule({
  declarations: [
    DeleteAccountDialogComponent,
    EditAccountComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    ToolbarModule,
    MatCardModule
  ]
})
export class ManageAccountModule { }
