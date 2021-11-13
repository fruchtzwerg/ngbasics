import { DOCUMENT } from '@angular/common';
import { ModuleWithProviders, NgModule, RendererFactory2 } from '@angular/core';

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
   * Use the generic to provide a string union type of your themes' filenames.
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
  public static forRoot<Theme extends string = string>(
    config: InitialConfig<Theme>
  ): ModuleWithProviders<ThemeSelectorModule>;

  /**
   * Use the generic to provide a string union type of your themes' filenames.
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
  public static forRoot(config: SelectorConfig): ModuleWithProviders<ThemeSelectorModule>;

  public static forRoot<Theme extends string = string>(
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
            rendererFactory: RendererFactory2
          ) => {
            return new ThemeSelectorService<Theme>(config, document, rendererFactory);
          },
          deps: [DOCUMENT, THEME_SELECTOR_CONFIG, RendererFactory2],
        },
        { provide: THEME_SELECTOR_CONFIG, useValue: { ...defaultThemeSelectorConfig, ...config } },
      ],
    };
  }
}
