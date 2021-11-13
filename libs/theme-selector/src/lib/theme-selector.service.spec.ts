import { TestBed } from '@angular/core/testing';

import { THEME_SELECTOR_CONFIG } from './theme-selector.config';
import { ThemeSelectorService } from './theme-selector.service';

describe('ThemeSelectorService', () => {
  let service: ThemeSelectorService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        ThemeSelectorService,
        { provide: THEME_SELECTOR_CONFIG, useValue: { defaultTheme: 'foo' } },
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
