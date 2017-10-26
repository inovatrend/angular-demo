import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {User} from "../../user/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnChanges {


  private editUserForm: FormGroup;

  @Input()
  public user: User = null;

  @Output()
  public userSaved: EventEmitter<User> = new EventEmitter(null);

  @Output()
  public userSaveFailed: EventEmitter<String> = new EventEmitter(null);

  @Output()
  public userDeleted: EventEmitter<User> = new EventEmitter(null);

  @Output()
  public userDeleteFailed: EventEmitter<User> = new EventEmitter(null);


  constructor(private formBuilder: FormBuilder, private userService: UserService) {

    this.editUserForm = formBuilder.group({
      'id': 0,
      'username': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'firstName': '',
      'lastName': '',
      'age': [0, Validators.pattern("[0-9]+")]
    });
  }


  ngOnChanges(changes: SimpleChanges): void {

    if (this.user != null) {
      this.editUserForm.get("username").setValue(this.user.username);
      this.editUserForm.get("firstName").setValue(this.user.firstName);
      this.editUserForm.get("lastName").setValue(this.user.lastName);
      this.editUserForm.get("age").setValue(this.user.age);
    }
  }

  public onSubmit(): void {

    console.log("Submitting user form: ");
    if (this.editUserForm.valid) {
      this.user.username = this.editUserForm.get("username").value;
      this.user.firstName = this.editUserForm.get("firstName").value;
      this.user.lastName = this.editUserForm.get("lastName").value;
      this.user.age = this.editUserForm.get("age").value;

      this.userService.saveUser(this.user)
        .subscribe(
          savedUser => {
            console.log("User saved", savedUser);
            this.userSaved.emit(savedUser);
          },
          error => {
            console.log("Failed to save user", error);
            this.userSaveFailed.emit(error.toString());
          }
        )
    }
  }

  public deleteUser() {

    if (this.user != null) {
      this.userService.deleteUser(this.user).subscribe(
        result => {
          let success = (result.toLowerCase().trim() == 'true');
          if (success) {
            this.userDeleted.emit(this.user);
            console.log("User deleted successfully");
          }
        },
        error => {
          console.log("Failed to delete user");
          this.userDeleteFailed.emit(error);
        }
      )
    }
  }


}
