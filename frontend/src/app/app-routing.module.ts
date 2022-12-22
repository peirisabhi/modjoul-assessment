import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {UserComponent} from "./component/user/user.component";
import {PostComponent} from "./component/post/post.component";
import {LoginComponent} from "./component/login/login.component";
import {PostListComponent} from "./component/post-list/post-list.component";

const routes: Routes = [
  {path: 'dashboard', component:DashboardComponent},
  {path: 'user', component:UserComponent},
  {path: 'post', component:PostComponent},
  {path: 'login', component:LoginComponent},
  {path: '', component:PostListComponent},
  {path: 'dashboard/ui', component:DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
