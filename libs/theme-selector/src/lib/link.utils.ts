import { RendererFactory2 } from '@angular/core';

import { Selector } from './theme-selector.config.model';

const themeRegex = /^.*\/(?<theme>.+)\.css$/;

export const createLink = <T extends string>(
  document: Document,
  factory: RendererFactory2,
  theme: T
): [HTMLLinkElement, T] => {
  const renderer = factory.createRenderer(null, null);
  const link: HTMLLinkElement = renderer.createElement('link');

  link.setAttribute('rel', 'stylesheet');
  link.href = `${theme}.css`;

  renderer.appendChild(document.head, link);

  return [link, theme];
};

export const selectLink = <T extends string>(
  document: Document,
  selector: Selector,
  theme?: T
): [HTMLLinkElement, T] => {
  const link = selector(document);
  if (!link) throw new Error(`No element matches ${selector}`);

  const initialTheme = link.href.match(themeRegex)?.groups?.theme as T;

  return [link, theme ?? initialTheme];
};
