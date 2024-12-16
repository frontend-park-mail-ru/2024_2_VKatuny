// @ts-check

import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(
  {
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
  {
    ...pluginJs.configs.recommended,
    files: ['src/**/*.js', 'src/**/*.mjs'],
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: 'vdom',
          args: 'after-used',
        },
      ],
    },
  },
  tsEslint.configs.recommended,
  eslintConfigPrettier,

  {
    files: ['src/**/*.tsx', 'src/**/*.ts'],
  },
  {
    ignores: [
      '**/node_modules/',
      '**/.git/',
      'src/public/js/templates.precompiled.js',
      'src/public/js/handlebars.runtime.js',
      'dist',
      'webpack.*.js',
      'build/HandlebarsRuntime/Handlebars.cjs',
    ],
  },
);
