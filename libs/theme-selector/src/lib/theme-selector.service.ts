import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { createLink, selectLink } from './link.utils';
import { WINDOW } from './providers/window.provider';
import { THEME_SELECTOR_CONFIG } from './theme-selector.config';
import { isSelectorConfig, ThemeSelectorConfig } from './theme-selector.config.model';

export const THEME_KEY = 'theme';

const setTheme =
  (link: HTMLLinkElement, storage?: Storage) =>
  <T extends string>(theme: T) => {
    link.href = `${theme}.css`;
    storage?.setItem(THEME_KEY, theme);
  };

type MediaMatches = Pick<MediaQueryListEvent, 'matches'>;

@Injectable()
export class ThemeSelectorService<T extends string = string> {
  private _theme: BehaviorSubject<T>;
  private _osIsDark: BehaviorSubject<MediaMatches>;

  public theme$: Observable<T>;
  public get currentTheme() {
    return this._theme.value;
  }

  public osIsDark$: Observable<boolean>;
  public get osIsDark() {
    return this._osIsDark.value;
  }

  constructor(
    @Inject(THEME_SELECTOR_CONFIG) config: ThemeSelectorConfig<T>,
    @Inject(DOCUMENT) document: Document,
    @Inject(WINDOW) window: Window,
    rendererFactory: RendererFactory2
  ) {
    const userTheme = config.storage?.getItem(THEME_KEY) as T | undefined;
    const osIsDark = window.matchMedia('(prefers-color-scheme: dark)');

    const [link, initialTheme] = isSelectorConfig(config)
      ? selectLink<T>(document, config.selector, userTheme)
      : createLink<T>(document, rendererFactory, userTheme ?? config.initialTheme);

    // init theme
    this._theme = new BehaviorSubject(initialTheme);
    this.theme$ = this._theme.asObservable();

    this.theme$.subscribe(setTheme(link, config.storage));

    // init os listener
    this._osIsDark = new BehaviorSubject<MediaMatches>(osIsDark);
    this.osIsDark$ = this._osIsDark.pipe(map(e => e.matches));

    osIsDark.onchange = e => this._osIsDark.next(e);
  }

  /** Load a theme. The corresponding CSS file will be loaded asynchronously. */
  public selectTheme(theme: T) {
    this._theme.next(theme);
  }
}
