module.exports = {
  extends: "standard",
  rules: {
    'semi': ['error', 'always'],
    'space-before-function-paren': 'off',
    'no-unused-vars': ['error', {
      'args': 'none',
      'varsIgnorePattern': 'regeneratorRuntime'
    }]
  },
  globals: {
    getApp: false,
    Page: false,
    wx: false,
    App: false,
    getCurrentPages: false,
    Component: false,
    Element: null,
    Document: null,
    Node: null
  }
};
