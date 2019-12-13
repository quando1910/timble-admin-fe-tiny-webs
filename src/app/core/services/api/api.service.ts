
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

export { END_POINT } from '../../../config/api.config';
import { environment } from '../../../../environments/environment';
export const API_BASE_URL = `${environment.API_URL_DEV}`;

export interface RequestOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?;
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  withCredentials?: boolean;
}

export interface CustomReqOptions extends RequestOptions {
  observe?: 'body';
  responseType?: 'json';
}

@Injectable({providedIn: 'root'})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  getExternal(url, options?: any) {
    return this.http.get(`${url}`, { params: options });
  }

  get(endpoint: Array<string>, options?: any): Observable<Object> {
    const uri = endpoint.join('/');
    return this.http.get(`${API_BASE_URL}/${uri}`, { params: options });
  }

  post(endpoint: Array<string>, data: any, options?: CustomReqOptions): Observable<Object> {
    const uri = endpoint.join('/');
    return this.http.post(`${API_BASE_URL}/${uri}`, data, options);
  }

  put(endpoint: string, data: any, options?: CustomReqOptions): Observable<Object> {
    return this.http.put(`${API_BASE_URL}/${endpoint}`, data, options);
  }

  putFormData(endpoint: string, data: any, options?: CustomReqOptions): Observable<Object> {
    const form = this._form(data);
    return this.http.put(`${API_BASE_URL}/${endpoint}`, form);
  }

  delete(endpoint: string, id: string | number, options?: CustomReqOptions): Observable<string | Object> {
    return this.http.delete(`${API_BASE_URL}/${endpoint}/${id}`, options);
  }

  private _form(data: any = {}): any {
    const form = new FormData();
    for (const param in data) {
      // console.log(param);
      if (data.hasOwnProperty(param)) {
        form.append(param, data[param]);
      }
    }
    console.log(form);
    return form;
  }
}
