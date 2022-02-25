import { DOCUMENT } from '@angular/common';
import { ModuleWithProviders, NgModule, RendererFactory2 } from '@angular/core';

import { WINDOW } from './providers/window.provider';
import { defaultThemeSelectorConfig, THEME_SELECTOR_CONFIG } from './theme-selector.config';
import { InitialConfig, SelectorConfig, ThemeSelectorConfig } from './theme-selector.config.model';
import { ThemeSelectorService } from './theme-selector.service';

/**
 * Use `ThemeSelectorModule.forRoot<Theme>(config)` to init this module.
 *
 */
@NgModule()
export class ThemeSelectorModule {
  /**
   * Inject a theme into index.html programmatically.
   *
   * NOTE: Use the generic to provide a string union type of your themes' filenames.
   *
   * @example
   * ```ts
   * imports: [ThemeSelectorModule.forFeature({ initialTheme: 'dark' })]
   * ```
   *
   * Don't forget to add your themes to angular.json:
   * ```json
   * "styles": [
        "src/styles.scss",
        {
          "bundleName": "dark",
          "input": "src/themes/dark.scss",
          "inject": false
        },
        {
          "bundleName": "light",
          "input": "src/themes/light.scss",
          "inject": false
        }
      ]
   * ```
   */
  public static forFeature<Theme extends string = string>(
    config: InitialConfig<Theme>
  ): ModuleWithProviders<ThemeSelectorModule>;

  /**
   * Use a preloaded theme from index.html.
   *
   * NOTE: Use the generic to provide a string union type of your themes' filenames.
   *
   * @example
   * ```html
   * <!-- index.html -->
   * <link rel="stylesheet" id="theme" href="dark.css" />
   * ```
   *
   * ```ts
   * // feature.module.ts
   * imports: [ThemeSelectorModule.forFeature({
   *  selector: document => document.querySelector<HTMLLinkElement>('#theme')
   * })]
   * ```
   *
   * Don't forget to add your themees to angular.json:
   * ```json
   * "styles": [
        "src/styles.scss",
        {
          "bundleName": "dark",
          "input": "src/themes/dark.scss",
          "inject": false
        },
        {
          "bundleName": "light",
          "input": "src/themes/light.scss",
          "inject": false
        }
      ]
   * ```
   */
  public static forFeature(config: SelectorConfig): ModuleWithProviders<ThemeSelectorModule>;

  public static forFeature<Theme extends string = string>(
    config: ThemeSelectorConfig<Theme>
  ): ModuleWithProviders<ThemeSelectorModule> {
    return {
      ngModule: ThemeSelectorModule,
      providers: [
        {
          provide: ThemeSelectorService,
          useFactory: (
            document: Document,
            config: ThemeSelectorConfig<Theme>,
            window: Window,
            rendererFactory: RendererFactory2
          ) => new ThemeSelectorService<Theme>(config, document, window, rendererFactory),
          deps: [DOCUMENT, THEME_SELECTOR_CONFIG, WINDOW, RendererFactory2],
        },
        { provide: THEME_SELECTOR_CONFIG, useValue: { ...defaultThemeSelectorConfig, ...config } },
      ],
    };
  }
}
