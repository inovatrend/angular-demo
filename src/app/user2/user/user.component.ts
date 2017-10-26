import {Component, OnInit} from '@angular/core';
import {User} from "../../user/user.model";
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-user2',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],

})
export class UserComponent2 implements OnInit {

  public users: User[] = [];
  public selectedUser: User = null;
  public successMessage: string = null;
  public failureMessage: string = null;


  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.userList.subscribe(users => this.users = users);
    this.userService.fetchUsers();
  }


  selectUser(user: User): boolean {
    this.selectedUser = user;
    return false;
  }


  public addNewUser(): boolean {
    let newUser = new User(0, "new user", "", "", 0);
    this.selectUser(newUser);
    return false;
  }


  public handleSaveSuccessEvent(user: User) {
    this.successMessage = "User data saved successfully!";
    setTimeout(() => this.resetSuccessMessage(), 2000);
    this.userService.fetchUsers();
  }

  public handleSaveFailedEvent(error: string) {
    this.failureMessage = "User data save failed!";
    setTimeout(() => this.resetFailureMessage(), 2000);
  }

  public handleDeleteSuccessEvent(user: User) {
    this.selectUser(null);
    this.successMessage = "User " + user.username + " deleted successfully!";
    setTimeout(() => this.resetSuccessMessage(), 2000);
    this.userService.fetchUsers();
  }

  public handleDeleteFailedEvent(user: User) {
    this.failureMessage = "Failed to delete user: " + user.username;
    setTimeout(() => this.resetFailureMessage(), 2000);
  }

  public resetSuccessMessage() {
    this.successMessage = null;
  }

  public resetFailureMessage() {
    this.failureMessage = null;
  }


}
