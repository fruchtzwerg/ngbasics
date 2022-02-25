import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken('global window', { factory: () => window });
