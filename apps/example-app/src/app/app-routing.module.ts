import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'polling',
    loadChildren: () =>
      import('./polling-example/polling-example.module').then(m => m.PollingExampleModule),
  },
  {
    path: 'theme',
    loadChildren: () => import('./theme-example/theme.module').then(m => m.ThemeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
