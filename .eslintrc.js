module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      env: {
        jest: true
      },
      files: [
        "**/*.spec.js",
        "**/*.spec.jsx",
        "**/*.test.js",
        "**/*.test.jsx"
      ]
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off"
  },
};
