import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {ApiResponse, AppUser, AppUserCreateForm, AppUserUpdateForm, UserEndpoint} from '../apina/apina';

@Injectable()
export class UserService {
  private _currentUser: AppUser;

  constructor(private userEndpoint: UserEndpoint,
              private authService: AuthService) {
  }

  register(userCreateForm: AppUserCreateForm): Observable<ApiResponse> {
    return this.userEndpoint.createUser(userCreateForm);
  }

  login(): Observable<AppUser> {
    this.authService.login();
    return this.getUserOne();
  }

  private getUserOne(): Observable<AppUser> {
    const userOneObservable = this.userEndpoint.findUserByName('kelvin');
    userOneObservable.subscribe(user => this.currentUser = user);
    return userOneObservable;
  }

  refreshUser(): Observable<AppUser> {
    return this.getUserOne();
  }


  get currentUser(): AppUser {
    return this._currentUser;
  }

  set currentUser(value: AppUser) {
    this._currentUser = value;
  }

  updateUser(form: AppUserUpdateForm) {
    return this.userEndpoint.updateUser(form, this._currentUser.username);
  }
}
