import { Observable } from 'rxjs';

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
}
