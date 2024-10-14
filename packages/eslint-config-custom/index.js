module.exports = {
  extends: ['turbo', 'prettier', 'next'],
  env: {
    node: true,
    es6: true,
  },
  globals: {
    globalThis: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', ''],
  },
  rules: {
    "no-console": 2,
    'import/prefer-default-export': 'off',
    "@next/next/no-html-link-for-pages": "off",


  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/index.ts'],
      env: {
        jest: true,
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};