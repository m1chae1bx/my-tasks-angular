import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyTasksComponent } from './my-tasks.component';


const routes: Routes = [
  {
    path: '',
    component: MyTasksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTasksRoutingModule { }