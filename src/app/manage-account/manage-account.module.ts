import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteAccountDialogComponent } from './delete-account-dialog/delete-account-dialog.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';



@NgModule({
  declarations: [
    DeleteAccountDialogComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ManageAccountModule { }
