import {Injectable} from '@angular/core';
import {BackendContext, RequestData} from './backend-context';
import {Observable} from 'rxjs';

export class UserCreateForm {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export class ApiResponse {
  code: number;
  type: string;
  message: string;
}

export class AppUser {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

@Injectable()
export class UserEndpoint {
  constructor(private context: BackendContext) {
  }

  register(userCreateFrom: UserCreateForm): Observable<ApiResponse> {
    const data: RequestData = {
      method: 'post',
      path: 'user',
      requestBody: userCreateFrom
    };

    return this.context.request(data);
  }

  login(): Observable<AppUser> {
    const data: RequestData = {
      method: 'get',
      path: 'user/' + 'kelvin'
    };

    return this.context.request(data);
  }
}
