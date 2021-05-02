import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/user.service';
import {ApiResponse, UserCreateForm} from '../../core/http/UserEndpoint';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;

  showMessage = false;
  message = '';

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    const userCreateForm: UserCreateForm = new UserCreateForm();
    userCreateForm.username = this.username;
    userCreateForm.firstName = this.firstname;
    userCreateForm.lastName = this.lastname;
    userCreateForm.email = this.email;
    userCreateForm.phone = this.phone;

    this.userService.register(userCreateForm).subscribe(
      (res: ApiResponse) => {
        if (res.code === 0) {
          this.message = 'success';
          this.showMessage = true;
        }
      },
      (error => {
        this.message = 'error';
        this.showMessage = true;
        console.log(error);
      })
    );
  }

}
