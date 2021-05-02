import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/user.service';
import {AppUser} from '../../core/http/UserEndpoint';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onLogin() {
    this.userService.login().subscribe(
      (user: AppUser) => {
        this.userService.currentUser = user;
        this.router.navigate(['']);
      },
      error => {
        // show message
      });
  }
}
