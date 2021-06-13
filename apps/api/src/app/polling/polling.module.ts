import { Module } from '@nestjs/common';

import { PollingController } from './polling.controller';

@Module({
  controllers: [PollingController],
})
export class PollingModule {}
