import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/user/user.service';
import {Router} from '@angular/router';
import {AppUser} from '../../core/apina/apina';

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
        this.router.navigate(['/home']);
      },
      error => {
        // show message
      });
  }
}
