import { discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';

import { PollingConfigToken } from '../constants';
import { PollingConfig } from '../models/polling-config.model';
import { Polling } from '../models/polling.model';

import { PollingFactoryService } from './polling-factory.service';

const duration = 1_000;
const MOCK_POLLING_CONFIG: PollingConfig = {
  initialDelay: duration,
  pollingRate: duration,
};

describe('PollingFactoryService', () => {
  let service: PollingFactoryService;
  let spy: jest.Mock;
  let action: jest.Mock;
  let polling: Polling<unknown>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PollingFactoryService,
        {
          provide: PollingConfigToken,
          useValue: MOCK_POLLING_CONFIG,
        },
      ],
    });

    service = TestBed.inject(PollingFactoryService);
    spy = jest.fn();
    action = jest.fn(() => of('foo'));
    polling = service.create(action);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('polling', () => {
    it('should execute action periodically', fakeAsync(() => {
      polling.status$.subscribe(spy);

      tick(duration * 5);

      expect(action).toHaveBeenCalledTimes(5);
      expect(spy).toHaveBeenCalledTimes(5);

      discardPeriodicTasks();
    }));

    it('should terminate periodic execution, when status is unsubscribed', fakeAsync(() => {
      polling.status$.pipe(take(3)).subscribe(spy);

      tick(duration * 5);

      expect(spy).toHaveBeenCalledTimes(3);
    }));
  });

  describe('immediate', () => {
    it('should execute action immediatly', () => {
      polling.update();

      expect(action).toHaveBeenCalled();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should update status immediatly', fakeAsync(() => {
      polling.status$.subscribe(spy);
      tick(duration * 5);

      polling.update();
      tick();

      expect(action).toBeCalledTimes(6);
      expect(spy).toHaveBeenCalledTimes(6);

      discardPeriodicTasks();
    }));
  });
});
