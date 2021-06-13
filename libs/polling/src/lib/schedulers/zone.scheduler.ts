import { NgZone } from '@angular/core';
import { SchedulerAction, SchedulerLike, Subscription } from 'rxjs';

export type Action<T> = (this: SchedulerAction<T>, state?: T) => void;

export abstract class ZoneScheduler implements SchedulerLike {
  constructor(protected scheduler: SchedulerLike, protected ngZone: NgZone) {}

  now(): number {
    return this.scheduler.now();
  }

  abstract schedule(...args: unknown[]): Subscription;
}

/** Schedules actions to run inside NgZone. */
export class EnterZoneScheduler extends ZoneScheduler {
  schedule<T>(...args: [Action<T>, number, T]): Subscription {
    return this.ngZone.run(() => this.scheduler.schedule<T>(...args));
  }
}

/** Schedules actions to run outside NgZone. */
export class LeaveZoneScheduler extends ZoneScheduler {
  schedule<T>(...args: [Action<T>, number, T]): Subscription {
    return this.ngZone.runOutsideAngular(() =>
      this.scheduler.schedule<T>(...args)
    );
  }
}
