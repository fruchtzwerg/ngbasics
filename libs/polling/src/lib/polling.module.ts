import { ModuleWithProviders, NgModule } from '@angular/core';

import { DEFAULT_POLLING_CONFIG, PollingConfigToken } from './constants';
import { PollingConfig } from './models/polling-config.model';
import { PollingFactoryService } from './services/polling-factory.service';

/**
 * Register with `forChild(config)`.
 *
 * Default polling rate is 5s without initial delay.
 *
 * @example
 * imports: [PollingModule.forChild({
 *   initialDelay: Duration.THIRTY_SECONDS,
 *   pollingRate: Duration.ONE_MINUTE
 * })]
 */
@NgModule({
  providers: [PollingFactoryService],
})
export class PollingModule {
  static forChild(config: Partial<PollingConfig> = {}): ModuleWithProviders<PollingModule> {
    const mergedConfig: PollingConfig = {
      ...DEFAULT_POLLING_CONFIG,
      ...config,
    };

    return {
      ngModule: PollingModule,
      providers: [{ provide: PollingConfigToken, useValue: mergedConfig }],
    };
  }
}
