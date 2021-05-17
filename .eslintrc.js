module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  settings: {
    react: { version: 'detect' },
  },
  rules: { 'comma-dangle': 'off', 'space-before-function-paren': 'off' },
}
