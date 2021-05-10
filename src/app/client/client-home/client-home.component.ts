import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/user/user.service';
import {AppUser, AppUserUpdateForm} from '../../core/apina/apina';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {
  user: AppUser;
  isEditing = false;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.user = this.userService.currentUser;
  }

  onEdit() {
    this.isEditing = true;
  }

  onSubmit() {
    const form: AppUserUpdateForm = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phone: this.user.phone,
      userStatus: this.user.userStatus
    };
    this.userService.updateUser(form).subscribe(
      () => {
        this.refreshUser();
      }
    );
  }

  private refreshUser() {
    this.userService.refreshUser().subscribe(
      (user => {
        this.user = user;
        this.isEditing = false;
      })
    );
  }

  onCancel() {
    this.isEditing = false;
  }

}
