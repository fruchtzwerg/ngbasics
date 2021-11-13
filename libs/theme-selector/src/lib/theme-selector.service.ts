import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { createLink, selectLink } from './link.utils';
import { THEME_SELECTOR_CONFIG } from './theme-selector.config';
import { isSelectorConfig, ThemeSelectorConfig } from './theme-selector.config.model';

const THEME = 'theme';

const setTheme =
  (link: HTMLLinkElement, storage?: Storage) =>
  <T extends string>(theme: T) => {
    link.href = `${theme}.css`;
    storage?.setItem(THEME, theme);
  };

@Injectable()
export class ThemeSelectorService<T extends string = string> {
  public theme$: Observable<T>;

  public get currentTheme() {
    return this.theme.value;
  }

  private theme: BehaviorSubject<T>;

  constructor(
    @Inject(THEME_SELECTOR_CONFIG) config: ThemeSelectorConfig<T>,
    @Inject(DOCUMENT) document: Document,
    rendererFactory: RendererFactory2
  ) {
    const userTheme = config.storage?.getItem(THEME) as T | undefined;

    const [link, initialTheme] = isSelectorConfig(config)
      ? selectLink<T>(document, config.selector, userTheme)
      : createLink<T>(document, rendererFactory, userTheme ?? config.initialTheme);

    this.theme = new BehaviorSubject(initialTheme);
    this.theme$ = this.theme.asObservable();

    this.theme$.subscribe(setTheme(link, config.storage));
  }

  /** Load a theme. The corresponding CSS file will be loaded asynchronously. */
  public selectTheme(theme: T) {
    this.theme.next(theme);
  }
}
