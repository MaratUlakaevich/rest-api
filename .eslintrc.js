module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'import',
    'prettier',
    'jsdoc'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:jsdoc/recommended',
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error', // Использование Prettier как правило ESLint
    'no-unused-vars': 'warn', // Предупреждение об объявленных, но неиспользуемых переменных
    'prefer-const': 'error', // Предпочтение использования const там, где это возможно
    'eqeqeq': 'error', // Требование использования === и !== вместо == и !=
    'import/order': [
      'error',
      {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always'
      }
    ],
    '@typescript-eslint/explicit-function-return-type': 'off', // Отключение обязательного указания типа возвращаемого значения для функций
    '@typescript-eslint/no-explicit-any': 'warn', // Предупреждение о использовании any
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }], // Игнорирование неиспользуемых аргументов, начинающихся с _
    'jsdoc/check-alignment': 'error', // Проверка выравнивания JSDoc
    'jsdoc/check-indentation': 'error', // Проверка отступов в JSDoc
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  env: {
    node: true,
    es2021: true
  }
};
