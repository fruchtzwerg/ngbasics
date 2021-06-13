import { Component } from '@angular/core';
import { of } from 'rxjs';

import { PollingFactoryService } from '@ngutils/polling';

import { PollingApiService } from './services/polling-api.service';

@Component({
  selector: 'ngutils-polling-example',
  templateUrl: './polling-example.component.html',
  styleUrls: ['./polling-example.component.scss'],
})
export class PollingExampleComponent {
  public logging = this.pollingFactory.create(() => of(console.log('action triggered')));
  public polling = this.pollingFactory.create(() => this.api.getData());

  constructor(private pollingFactory: PollingFactoryService, private api: PollingApiService) {
    this.logging.status$.subscribe();
  }
}
