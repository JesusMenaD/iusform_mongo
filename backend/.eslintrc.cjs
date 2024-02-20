module.exports = {
  env: {
    browser: false,
    es2022: true,
    node: true
  },
  extends: 'standard',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    semi: [2, 'always']
  }
};
