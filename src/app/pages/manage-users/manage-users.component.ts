import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from "../../service/user.service";
@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent {
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  addUser() {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      const isAdmin = true;

      if (isAdmin) {
        this.userService.addUser(user).subscribe(
          (newUser) => {
            console.log('User added successfully', newUser);
          },
          (error) => {
            console.error('Error adding user', error);
          }
        );
      } else {
        console.error('Permission denied: Only admins can add users.');
      }
    }
  }
}
