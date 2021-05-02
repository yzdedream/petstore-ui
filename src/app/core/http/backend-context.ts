import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

export interface RequestData {
  method: string;
  path: string;
  requestBody?: any;
}

@Injectable()
export class BackendContext {
  private baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  request(data: RequestData): Observable<any> {
    const url = this.baseUrl + data.path;

    let options;
    if (data.requestBody) {
      options = {
        body: data.requestBody
      };
    }

    return this.http.request(data.method, url, options);
  }
}
