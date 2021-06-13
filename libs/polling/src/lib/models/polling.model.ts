import { Observable } from 'rxjs';

export type PollingHandle<T> = Pick<Polling<T>, 'status$' | 'update'>;

export interface Polling<T> {
  /**
   * Continuously updated status; retains the last update.
   *
   * Don't forget to unsubscribe to terminate polling.
   */
  status$: Observable<T>;

  /**
   * Trigger an immediate update.
   *
   * The result can be observed directly as well as from the status$.
   */
  update: () => Observable<T>;

  /** Get a handle with enforced termination criterion. */
  takeUntil: (destroy$: Observable<unknown>) => PollingHandle<T>;
}
