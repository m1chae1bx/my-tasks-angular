import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditAccountComponent } from './edit-account/edit-account.component';

const routes: Routes = [
  {
    path: 'edit',
    component: EditAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAccountRoutingModule { }