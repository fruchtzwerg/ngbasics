import { TestBed } from '@angular/core/testing';

import { WINDOW } from './providers/window.provider';
import { THEME_SELECTOR_CONFIG } from './theme-selector.config';
import { ThemeSelectorService } from './theme-selector.service';

const WINDOW_MOCK = { matchMedia: jest.fn(() => ({ onchange: jest.fn() })) };

describe('ThemeSelectorService', () => {
  let service: ThemeSelectorService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        ThemeSelectorService,
        { provide: THEME_SELECTOR_CONFIG, useValue: { initialTheme: 'foo' } },
        { provide: WINDOW, useValue: WINDOW_MOCK },
      ],
    });

    service = TestBed.inject(ThemeSelectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should set initial theme', () => {
    expect(service.currentTheme).toBe('foo');
  });

  it('should set theme', () => {
    const fn = jest.fn();
    const expected = 'bar';

    service.theme$.subscribe(fn);
    service.selectTheme(expected);

    expect(fn).toHaveBeenCalledWith(expected);
    expect(service.currentTheme).toBe(expected);
  });
});
