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
    'prettier/prettier': 'error', 
    'no-unused-vars': 'warn', 
    'prefer-const': 'error', 
    'eqeqeq': 'error', 
    'import/order': [
      'error',
      {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always'
      }
    ],
    '@typescript-eslint/explicit-function-return-type': 'off', 
    '@typescript-eslint/no-explicit-any': 'warn', 
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }], 
    'jsdoc/check-alignment': 'error', 
    'jsdoc/check-indentation': 'error', 
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
