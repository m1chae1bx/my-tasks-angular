import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { LandingComponent } from './start/landing/landing.component';
import { LoginComponent } from './start/login/login.component';
import { RegisterComponent } from './start/register/register.component';

const routes: Routes = [
  { path: 'my-tasks', component: MyTasksComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }, @TODO
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
