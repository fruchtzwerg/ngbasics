import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { PollingModule } from '@ngutils/polling';

import { PollingExampleRoutingModule } from './polling-example-routing.module';
import { PollingExampleComponent } from './polling-example.component';

@NgModule({
  declarations: [PollingExampleComponent],
  imports: [
    CommonModule,
    PollingExampleRoutingModule,
    HttpClientModule,
    PollingModule.forChild({ initialDelay: 500, pollingRate: 5000 }),
  ],
})
export class PollingExampleModule {}
