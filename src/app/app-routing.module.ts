import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManageTasksComponent} from "./pages/manage-tasks/manage-tasks.component";
import {ManageUsersComponent} from "./pages/manage-users/manage-users.component";
import {SignInComponent} from "./pages/sign-in/sign-in.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";

const routes: Routes = [
  { path: '', redirectTo: '/sign-up', pathMatch: 'full' },
  { path: 'manage-tasks', component: ManageTasksComponent },
  { path: 'manage-users', component: ManageUsersComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
