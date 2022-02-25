import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemeSelectorModule } from '@ngbasics/theme-selector';

import { ThemeRoutingModule } from './theme-routing.module';
import { ThemeComponent } from './theme.component';

@NgModule({
  declarations: [ThemeComponent],
  imports: [
    CommonModule,
    ThemeRoutingModule,
    ThemeSelectorModule.forFeature({
      // initialTheme: 'light',
      storage: localStorage,
      selector: (document: Document) => document.querySelector<HTMLLinkElement>('#theme'),
    }),
  ],
  exports: [ThemeComponent],
})
export class ThemeModule {}
