# @ngbasics/theme-selector

Switch global styles at runtime.

![demo](https://github.com/fruchtzwerg/ngbasics/raw/master/libs/theme-selector/demo.gif)

---

## Installation

```sh
npm i @ngbasics/theme-selector
```

## Preparation

Build your stylesheets:

```scss
// src/themes/dark.scss
body {
  background-color: black;
  color: white;
}

// src/themes/light.scss
body {
  background-color: white;
  color: black;
}
```

Add to `angular.json` (dev-server needs to be restarted):

```json
"styles": [
  "src/styles.scss",
  {
    "bundleName": "dark", // <- produces 'dark.css'
    "input": "src/themes/dark.scss",
    "inject": false
  },
  {
    "bundleName": "light",
    "input": "src/themes/light.scss",
    "inject": false
  }
]
```

---

## Usage

### Configure the Module:

Add a link-tag to your `index.html` and provide a selector to the config.

```html
<!-- index.html -->
<link rel="stylesheet" id="theme" href="dark.css" />
```

```ts
// app.module.ts
const themeConfig: ThemeSelectorConfig = {
  selector: () => querySelector('#theme'),
};

@NgModule({
  imports: [ThemeSelectorModule.forRoot(themeConfig)],
})
export class AppModule {}
```

Alternatively, if it doesn't matter whether the initial style is loaded asynchronously or not, you can provide it's name in the config and let the service inject it into your html.

```ts
type Theme = 'light' | 'dark';

@NgModule({
  imports: [ThemeSelectorModule.forRoot<Theme>({ initialTheme: 'dark' })],
})
export class AppModule {}
```

### Use the service:

```ts
@Component({
  selector: 'app-theme',
  template: `<div>{{ themeService.theme$ | async }}</div>
    <button (click)="themeService.selectTheme('dark')">dark</button>
    <button (click)="themeService.selectTheme('light')">light</button>`,
})
export class ThemeComponent {
  constructor(public themeService: ThemeSelectorService<Theme>) {}
}
```

---

## Persistence

By default the selected theme is NOT persisted.

If you want to persist the selection provide a storage to the config:

```ts
const themeConfig: ThemeSelectorConfig = {
  storage: localStorage,
};
```

The storage must implement the `Storage` interface.

## OS light/dark listener

You can select a theme based on whether the user's operating system is light or dark by listening to `osIsDark$`:

```ts
@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
})
export class ThemeComponent {
  constructor(themeService: ThemeSelectorService<Theme>) {
    themeService.osIsDark$
      // respect user selected theme on reload
      .pipe(skip(localStorage.getItem(THEME_KEY) ? 1 : 0))
      .subscribe(dark => themeService.selectTheme(dark ? 'dark' : 'light'));
  }
}
```
