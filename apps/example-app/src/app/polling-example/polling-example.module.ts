import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { PollingModule } from '@ngbasics/polling';

import { PollingExampleRoutingModule } from './polling-example-routing.module';
import { PollingExampleComponent } from './polling-example.component';

@NgModule({
  declarations: [PollingExampleComponent],
  imports: [
    CommonModule,
    PollingExampleRoutingModule,
    HttpClientModule,
    PollingModule.forChild({ initialDelay: 500, pollingRate: 5_000 }),
  ],
})
export class PollingExampleModule {}
