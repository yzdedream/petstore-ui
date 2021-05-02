import {Injectable} from '@angular/core';
import {ApiResponse, AppUser, UserCreateForm, UserEndpoint} from './http/UserEndpoint';
import {Observable} from 'rxjs';

@Injectable()
export class UserService {
  private _currentUser: AppUser;

  constructor(private userEndpoint: UserEndpoint) {
  }

  register(userCreateForm: UserCreateForm): Observable<ApiResponse> {
    return this.userEndpoint.register(userCreateForm);
  }

  login(): Observable<AppUser> {
    return this.userEndpoint.login();
  }

  get currentUser(): AppUser {
    return this._currentUser;
  }

  set currentUser(value: AppUser) {
    this._currentUser = value;
  }
}
