module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'plugin:react/recommended',
    "eslint:recommended",
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    "space-before-function-paren": ["error", "never"],
    "react/prop-types": "off",
    "semi": ["error", "always"],
    "indent": ["error", 2]
  }
}
