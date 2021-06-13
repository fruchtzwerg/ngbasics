import { Module } from '@nestjs/common';

import { PollingModule } from './polling/polling.module';

@Module({
  imports: [PollingModule],
})
export class AppModule {}
