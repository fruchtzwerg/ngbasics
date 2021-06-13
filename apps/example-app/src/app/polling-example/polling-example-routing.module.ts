import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PollingExampleComponent } from './polling-example.component';

const routes: Routes = [{ path: '', component: PollingExampleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PollingExampleRoutingModule {}
