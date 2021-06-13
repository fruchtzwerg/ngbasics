import { InjectionToken } from '@angular/core';

import { PollingConfig } from './models/polling-config.model';

export const PollingConfigToken = new InjectionToken<PollingConfig>(
  '__POLLING_CONFIG__'
);

export const DEFAULT_POLLING_CONFIG: PollingConfig = {
  initialDelay: 0,
  pollingRate: 5_000,
};
