import love from 'eslint-config-love'

export default [
  {
    ...love,
    files: ['**/*.ts'],
    rules: {
      "@typescript-eslint/no-loss-of-precision": ["off"],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "property",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
        },
        {
          selector: "property",
          format: null,
          filter: {
            regex: "^(m_[A-Za-z0-9]+|[0-9]+|_[A-Za-z0-9_]+)$",
            match: true,
          },
        },
      ],
    },
  },
]
