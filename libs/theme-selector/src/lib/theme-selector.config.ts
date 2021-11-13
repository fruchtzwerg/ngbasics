import { InjectionToken } from '@angular/core';

import { ThemeSelectorConfig } from './theme-selector.config.model';

export const THEME_SELECTOR_CONFIG = new InjectionToken<ThemeSelectorConfig>(
  'THEME_SELECTOR_CONFIG'
);

export const defaultThemeSelectorConfig: ThemeSelectorConfig = {
  initialTheme: 'replace-with-my-theme',
};
