module.exports = {
  extends: 'standard-with-typescript',
  rules: {
    '@typescript-eslint/no-loss-of-precision': ['warn'],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'property',
        format: [
          'camelCase',
          'PascalCase',
          'UPPER_CASE'
        ],
      },
      {
        selector: 'property',
        format: null,
        filter: {
          regex: '^(m_[A-Za-z0-9]+|[0-9]+)$',
          match: true,
        }
      }
    ]
  },
  parserOptions: {
    project: './tsconfig.json'
  }
}
