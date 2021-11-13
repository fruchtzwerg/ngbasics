import { Component, OnDestroy } from '@angular/core';
import { of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { PollingConfig, PollingConfigToken, PollingFactoryService } from '@ngutils/polling';

import { PollingApiService } from './services/polling-api.service';

const pollingConfig: Partial<PollingConfig> = { pollingRate: 2_000 };

@Component({
  selector: 'ngutils-polling-example',
  templateUrl: './polling-example.component.html',
  styleUrls: ['./polling-example.component.scss'],
  // override config for this component
  providers: [PollingFactoryService, { provide: PollingConfigToken, useValue: pollingConfig }],
})
export class PollingExampleComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  private _polling = this.pollingFactory.create(() => this.api.getData());
  public logging = this.pollingFactory.create(
    () => of(console.log('action triggered')),
    // override config for this handle
    {
      initialDelay: 3_000,
    }
  );

  // ensure polling terminates, when component is destroyed.
  public polling = this._polling.takeUntil(this.destroy$);

  constructor(private pollingFactory: PollingFactoryService, private api: PollingApiService) {
    // Only poll 3 times
    this.logging.status$.pipe(take(3)).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
