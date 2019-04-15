import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './common/auth/login.component';
import { SignUpComponent } from './common/auth/sign-up.component';
import { ToDoInfoComponent } from './to-do/info/to-do-info.component';
import { ToDoListComponent } from './to-do/list/to-do-list.component';
import { AuthGuard } from './common/auth/auth.guard';
import { NoAdminGuard } from './common/auth/no-admin.guard';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'todo/add',
    canActivate: [AuthGuard, NoAdminGuard],
    component: ToDoInfoComponent,
  },
  {
    path: 'todo/:todoId',
    canActivate: [AuthGuard],
    component: ToDoInfoComponent,
  },
  {
    path: 'todo',
    canActivate: [AuthGuard],
    component: ToDoListComponent,
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRoutes)],
})
export class AppRoutingModule {}
