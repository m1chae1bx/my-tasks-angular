import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  { 
    path: 'my-tasks', 
    loadChildren:() => import('./my-tasks/my-tasks.module').then(m => m.MyTasksModule), 
    canActivate: [AuthGuard], 
    // data: { animation: 'MyTasks'} // @todo For router animation
  },
  { 
    path: 'login', 
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule), 
  },
  { 
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule), 
  },
  { 
    path: 'manage-account', 
    loadChildren: () => import('./manage-account/manage-account.module').then(m => m.ManageAccountModule), 
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
