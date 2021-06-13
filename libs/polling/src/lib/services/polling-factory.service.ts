import { Inject, Injectable, NgZone } from '@angular/core';
import { asyncScheduler, defer, merge, Observable, queueScheduler, Subject, timer } from 'rxjs';
import { observeOn, shareReplay, switchMapTo, takeUntil } from 'rxjs/operators';

import { PollingConfigToken } from '../constants';
import { PollingConfig } from '../models/polling-config.model';
import { Polling } from '../models/polling.model';
import { EnterZoneScheduler, LeaveZoneScheduler } from '../schedulers/zone.scheduler';

@Injectable()
export class PollingFactoryService {
  private enterZone = new EnterZoneScheduler(asyncScheduler, this.zone);
  private leaveZone = new LeaveZoneScheduler(queueScheduler, this.zone);

  constructor(@Inject(PollingConfigToken) private config: PollingConfig, private zone: NgZone) {}

  public create<T>(
    action: () => Observable<T>,
    pollingConfig: Partial<PollingConfig> = {}
  ): Polling<T> {
    const config: PollingConfig = { ...this.config, ...pollingConfig };

    const immediate$ = new Subject<T>();
    const polling$ = defer(() =>
      timer(config.initialDelay, config.pollingRate, this.leaveZone).pipe(
        switchMapTo(defer(() => action()))
      )
    );

    /** merged status observable */
    const status$ = merge(immediate$, polling$).pipe(
      observeOn(this.enterZone),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    /** trigger an immediate update and return result */
    const update = () => {
      const res = action().pipe(shareReplay({ bufferSize: 1, refCount: true }));
      res.subscribe(res => immediate$.next(res));

      return res;
    };

    return {
      status$,
      update,
      takeUntil: destroy$ => ({
        status$: status$.pipe(takeUntil(destroy$)),
        update,
      }),
    };
  }
}
