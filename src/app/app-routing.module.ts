import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { AuthGuard } from './services/auth.guard';
import { LandingComponent } from './start/landing/landing.component';
import { LoginComponent } from './start/login/login.component';
import { RegisterComponent } from './start/register/register.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  { path: 'my-tasks', component: MyTasksComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: StartComponent },
  // { path: '**', component: PageNotFoundComponent }, @TODO
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
