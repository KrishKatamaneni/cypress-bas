module.exports = {
    env: {
      'cypress/globals': true,
      node: true,
      es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:cypress/recommended', 'plugin:json/recommended', 'eslint-config-prettier'],
    rules: {
      'prettier/prettier': 'error',
    },
    plugins: ['cypress', 'prettier'],
  };
  