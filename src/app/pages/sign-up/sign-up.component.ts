import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../../service/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group({
      organizationName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signUp() {
    if (this.signUpForm.valid) {
      const organizationData = this.signUpForm.value;
      const userData = {
        name: organizationData.userName,
        email: organizationData.email,
        password: organizationData.password,
        phoneNumber: organizationData.password,
        address: organizationData.password
      };

      this.userService.addUser(userData).subscribe(user => {
        this.router.navigate(['/manage-tasks']);
      }, error => {
        console.error('Error adding user', error);
      });
    }
  }
}
