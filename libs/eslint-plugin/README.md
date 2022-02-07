# eslint-plugin

Some defaults to streamline angular/nest development.

## rxjs

Includes the recommended config of [eslint-plugin-rxjs](https://www.npmjs.com/package/eslint-plugin-rxjs)

## Import order

Enforces a consistent order of imports. Maintaining import order is useful to prevent merge-conflicts.

In NX workspaces the `npmScope` will be loaded from nx.json to separate local imports from node_modules.

## Usage

Add the plugin to your `.eslint.json` and extend the recommended config.

```json
{
  "plugins": ["@ngbasics"],
  "extends": ["plugin:@ngbasics/recommended"],
  "parserOptions": {
    "project": "./tsconfig.*?.json"
  }
}
```
