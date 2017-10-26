import {Component, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {User} from "./user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users: User[] = [];

  public selectedUser: User = null;

  private editUserForm: FormGroup;

  public successMessage: string = null;

  public failureMessage: string = null;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {

    this.editUserForm = formBuilder.group({
      'id': 0,
      'username': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'firstName': '',
      'lastName': '',
      'age': [0, Validators.pattern("[0-9]+")]
    });
  }

  ngOnInit() {
    this.userService.userList.subscribe( users => this.users = users);
    this.userService.fetchUsers();
  }


  selectUser(user: User) {
    this.selectedUser = user;
    this.editUserForm.get("username").setValue(user.username);
    this.editUserForm.get("firstName").setValue(user.firstName);
    this.editUserForm.get("lastName").setValue(user.lastName);
    this.editUserForm.get("age").setValue(user.age);
  }


  public onSubmit(): void {

    console.log("Submitting user form: ");
    if (this.editUserForm.valid) {
      this.selectedUser.username = this.editUserForm.get("username").value;
      this.selectedUser.firstName = this.editUserForm.get("firstName").value;
      this.selectedUser.lastName = this.editUserForm.get("lastName").value;
      this.selectedUser.age = this.editUserForm.get("age").value;

      this.userService.saveUser(this.selectedUser)
        .subscribe(
          savedUser => {
            console.log("User saved", savedUser);
            this.selectUser(savedUser);
            this.userService.fetchUsers();
            this.successMessage = "User data saved successfully!";
            setTimeout(() => this.resetSuccessMessage(), 2000);
          },
          error => {
            console.log("Failed to save user", error);
            this.failureMessage = "User data save failed!";
            setTimeout(() => this.resetFailureMessage(), 2000);
          }
        )
    }
  }

  public deleteUser(user: User) {

    this.userService.deleteUser(user).subscribe(
      result => {
        let success = (result.toLowerCase().trim() == 'true');
        if (success) {
          this.successMessage = "User " + user.username + " deleted successfully!";
          setTimeout(() => this.resetSuccessMessage(), 2000);
          this.userService.fetchUsers();
          console.log("User deleted successfully");
          this.selectUser(null);
        }
      },
      error => {
        console.log("Failed to delete user", error);
        this.failureMessage = "User delete failed: " + user.username;
        setTimeout(() => this.resetFailureMessage(), 2000);
      }
    )
  }

  public addNewUser(): boolean {
    let newUser = new User(0, "new user", "", "", 0);
    this.selectUser(newUser);
    return false;
  }

  public resetSuccessMessage() {
    this.successMessage = null;
  }

  public resetFailureMessage() {
    this.failureMessage = null;
  }

}
