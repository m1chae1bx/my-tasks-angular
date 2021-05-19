import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyTasksComponent } from './my-tasks/my-tasks.component';

const routes: Routes = [
  { path: 'my-tasks', component: MyTasksComponent },
  { path: '',   redirectTo: '/my-tasks', pathMatch: 'full' }, // redirect to 'My Tasks'
  // { path: '**', component: PageNotFoundComponent }, @TODO
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
