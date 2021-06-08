import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MyTasksComponent } from './sub-modules/my-tasks/my-tasks.component';
import { AuthGuard } from './services/auth.guard';
import { LandingComponent } from './sub-modules/start/landing/landing.component';
import { StartComponent } from './sub-modules/start/start.component';
import { EditAccountComponent } from './sub-modules/manage-account/edit-account/edit-account.component';

const routes: Routes = [
  { 
    path: 'my-tasks', 
    loadChildren:() => import('./sub-modules/my-tasks/my-tasks.module').then(m => m.MyTasksModule), 
    canActivate: [AuthGuard], 
    // data: { animation: 'MyTasks'} // @todo For router animation
  },
  { 
    path: 'login', 
    loadChildren: () => import('./sub-modules/login/login.module').then(m => m.LoginModule), 
  },
  { 
    path: 'register',
    loadChildren: () => import('./sub-modules/register/register.module').then(m => m.RegisterModule), 
  },
  { 
    path: 'manage-account', 
    loadChildren: () => import('./sub-modules/manage-account/manage-account.module').then(m => m.ManageAccountModule), 
    canActivate: [AuthGuard], 
    // data: { animation: 'EditAccount' } // @todo For router animation
  },
  { path: '', component: StartComponent },
  // { path: '**', component: PageNotFoundComponent }, @TODO
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
