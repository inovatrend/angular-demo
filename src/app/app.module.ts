import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {UserComponent} from './user/user.component';
import {UserService} from "./user/user.service";
import {RouterModule, Routes} from "@angular/router";
import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy} from "@angular/common";


const routes: Routes = [

  {path: '', redirectTo: 'users', pathMatch: 'full' },
  {path: 'users', component: UserComponent},
];


@NgModule({

  declarations: [
    AppComponent,
    UserComponent
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
    UserService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
