import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {

  isLoggedIn = false;

  constructor() {
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  login() {
    this.isLoggedIn = true;
  }
}
