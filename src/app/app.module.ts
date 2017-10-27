import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {UserComponent} from './user/user.component';
import {UserService} from "./user/user.service";
import {RouterModule, Routes} from "@angular/router";
import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {UserComponent2} from "./user2/user/user.component";
import {EditUserComponent} from './user2/edit-user/edit-user.component';
import {PostComponent} from './post/post/post.component';
import {PostService} from "./post/post.service";


const routes: Routes = [

  {path: '', redirectTo: 'users', pathMatch: 'full' },
  {path: 'users', component: UserComponent},
  {path: 'users2', component: UserComponent2},
  {path: 'posts', component: PostComponent},
];


@NgModule({

  declarations: [
    AppComponent,
    UserComponent,
    UserComponent2,
    EditUserComponent,
    PostComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],

  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: APP_BASE_HREF, useValue: '/'},
    UserService,
    PostService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
