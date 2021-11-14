import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { ThemeSelectorService } from '@ngbasics/theme-selector';

import { Theme } from './theme.model';

const getOtherTheme = (theme: Theme) => (theme === 'light' ? 'dark' : 'light');

@Component({
  selector: 'ngbasics-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
})
export class ThemeComponent {
  public otherTheme$ = this.themeService.theme$.pipe(map(getOtherTheme));

  constructor(public themeService: ThemeSelectorService<Theme>) {
    themeService.osIsDark$.subscribe(dark => themeService.selectTheme(dark ? 'dark' : 'light'));
  }

  public toggleTheme() {
    const other = getOtherTheme(this.themeService.currentTheme);
    this.themeService.selectTheme(other);
  }
}
