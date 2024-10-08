import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    languageOptions: {
      globals: { ...globals.browser, Handlebars: 'readonly', userSession: 'readonly' },
    },
  },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['src/**/*.js', 'src/**/*.mjs'],
  },
  {
    ignores: [
      '**/node_modules/',
      '**/.git/',
      'src/public/js/templates.precompiled.js',
      'src/public/js/handlebars.runtime.min-v4.7.8.js',
    ],
  },
];
