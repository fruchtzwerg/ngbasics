import { join } from 'path';

const [root] = __dirname.split('node_modules');
const packageJsonPath = join(root, 'package.json');
const nxJsonPath = join(root, 'nx.json');

const packageJson = require(packageJsonPath);
const nxJson = require(nxJsonPath);
const scope = `@${nxJson?.npmScope ?? packageJson.name}`;

const z = (x: number) => (x < 10 ? `0${x}` : x);
const t = new Date();

console.info(
  `[Info  - ${z(t.getHours())}:${z(t.getMinutes())}:${z(t.getSeconds())}]`,
  `ESLint import order: init local import scope as '${scope}'`
);

export const recommended = {
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      plugins: ['rxjs', 'import'],
      extends: ['plugin:rxjs/recommended'],
      parserOptions: {
        project: './tsconfig.*?.json',
      },
      rules: {
        'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
        'import/order': [
          'warn',
          {
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
            groups: [['builtin', 'external'], 'internal', 'parent', 'sibling', 'index', 'object'],
            pathGroups: [
              {
                pattern: '@/**',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: `${scope}/**`,
                group: 'internal',
                position: 'before',
              },
            ],
            pathGroupsExcludedImportTypes: [],
          },
        ],
      },
    },
  ],
};
