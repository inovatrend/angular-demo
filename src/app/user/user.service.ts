import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {User} from "./user.model";
import {environment} from "../../environments/environment";
import "rxjs/add/operator/map";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class UserService {

  private listUsersUrl = environment.baseServerUrl + "/user/list";

  private userList_: BehaviorSubject<User[]> = new BehaviorSubject([]);
  public userList:Observable<User[]> = this.userList_.asObservable();

  constructor(private http: Http) { }

  public fetchUsers() {

    console.log("Fetching users...");

    this.http.get(this.listUsersUrl)
      .map(resp => {
        console.log("Users fetched");
        return resp.json();
      })
      .map(json => json.map(usr => User.fromJson(usr)))
      .subscribe(
        usrList => this.userList_.next(usrList),
        error => console.log("Failed to fetch users from server", error)
      );
  }

}
