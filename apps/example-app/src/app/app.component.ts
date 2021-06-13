import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Message } from '@ngutils/api-interfaces';

import { routes } from './app-routing.module';

@Component({
  selector: 'ngutils-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');

  public routes = routes.map(route => route.path);

  constructor(private http: HttpClient) {}
}
