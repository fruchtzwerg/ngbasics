export interface InitialConfig<T> {
  storage?: Storage;
  initialTheme: T;
}

export interface SelectorConfig {
  storage?: Storage;
  selector: (document: Document) => HTMLLinkElement | null;
}

export type Selector = (document: Document) => HTMLLinkElement | null;

export type ThemeSelectorConfig<T extends string = string> = InitialConfig<T> | SelectorConfig;

export const isSelectorConfig = <T extends string>(
  config: ThemeSelectorConfig<T>
): config is SelectorConfig => !!(config as SelectorConfig).selector;
