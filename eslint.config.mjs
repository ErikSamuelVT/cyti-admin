import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginPrettier from 'eslint-plugin-prettier';

import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    }, // Aplica a todos los JS/TS/TSX
    plugins: {
      'simple-import-sort': simpleImportSort,
      prettier: eslintPluginPrettier,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // Orden automático de imports y exports
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // Integra Prettier
      'prettier/prettier': 'error',
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@', './'], // Ajusta esto según tus alias
            ['@/app', './app'],
          ],
          extensions: ['.js', '.ts', '.tsx', '.jsx'],
        },
      },
    },
  },
];
