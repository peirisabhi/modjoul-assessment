import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {TopbarComponent} from "./component/common/topbar/topbar.component";
import {SideNavbarComponent} from "./component/common/side-navbar/side-navbar.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { UserComponent } from './component/user/user.component';
import {DataTablesModule} from "angular-datatables";
import { PostComponent } from './component/post/post.component';
import {LoginComponent} from "./component/login/login.component";
import { PostListComponent } from './component/post-list/post-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TopbarComponent,
    SideNavbarComponent,
    UserComponent,
    PostComponent,
    LoginComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    DataTablesModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
