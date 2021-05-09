import {ApinaConfig, ApinaEndpointContext, RequestData} from './apina';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class PetstoreApinaEndpointContext extends ApinaEndpointContext {
  constructor(private httpClient: HttpClient, config: ApinaConfig) {
    super(config);
    config.baseUrl = 'http://localhost:8080';
  }

  request(data: RequestData): Observable<any> {
    const url = this.buildUrl(data.uriTemplate, data.pathVariables);

    const requestParams = data.requestParams;
    let params: HttpParams | undefined = undefined;
    if (requestParams != null) {
      const filteredParams: { [key: string]: any } = {};
      for (const key of Object.keys(requestParams)) {
        const value = requestParams[key];
        if (value != null)
          filteredParams[key] = value;
      }

      params = new HttpParams({fromObject: filteredParams});
    }


    return this.httpClient.request(data.method, url, {params: params, body: data.requestBody})
      .pipe(map(r => data.responseType ? this.config.deserialize(r, data.responseType) : r));
  }
}
