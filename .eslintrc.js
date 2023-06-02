module.exports = {
  extends: 'standard-with-typescript',
  rules: {
    '@typescript-eslint/naming-convention': 'off'
  },
  parserOptions: {
    project: './tsconfig.json'
  }
}
