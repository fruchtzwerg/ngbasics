import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PollingApiService {
  private url = `${environment.baseUrl}/polling`;

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<number>(this.url);
  }
}
