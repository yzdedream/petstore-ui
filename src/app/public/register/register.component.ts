import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/user/user.service';
import {ApiResponse, AppUserCreateForm} from '../../core/apina/apina';

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
    const userCreateForm: AppUserCreateForm = {
      username: this.username,
      firstName: this.firstname,
      lastName: this.lastname,
      email: this.email,
      phone: this.phone
    };

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
