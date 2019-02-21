module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential'
  ],
  globals: {
    "applicationCache": false,
    "atob": false,
    "btoa": false,
    "console": false,
    "document": false,
    "location": false,
    "window": false
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': [1, 'never'],
    'indent': [1, 2],
    'comma-dangle': 0,
    "linebreak-style": [0 ,"error", "windows"],
    "no-new": 0,
    "no-alert": 0,
    "max-len": 0,
    "no-extra-parens": [1, 'all'],
    "eqeqeq": [1, 'always']
  }
}