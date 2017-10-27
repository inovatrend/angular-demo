import {Injectable} from '@angular/core';
import {Headers, Http, URLSearchParams} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";
import "rxjs/add/operator/map";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {User} from "./user.model";

@Injectable()
export class UserService {

  private listUsersUrl = environment.baseServerUrl + "/user/list";
  private saveUserUrl = environment.baseServerUrl + "/user/save";
  private deleteUserUrl = environment.baseServerUrl + "/user/delete";

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


  public saveUser(user: User): Observable<User> {
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify(user);
    return this.http.post(this.saveUserUrl, body, {headers}).map(resp => User.fromJson(resp.json()));
  }


  public deleteUser(user: User): Observable<string> {
    let params = new URLSearchParams();
    params.set("userId", user.id.toString());
    return this.http.get(this.deleteUserUrl, {search: params}).map(resp => resp.text());
  }
}
