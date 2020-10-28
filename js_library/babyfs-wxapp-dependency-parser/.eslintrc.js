module.exports = {
    "root": true,
    "parser": "babel-eslint",
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "quotes": [ "error", "single" ],
        "semi": [ "error", "always" ],
        "no-unused-vars": ["error", {
          "varsIgnorePattern": "regeneratorRuntime",
          "args": "none"
        }],
        "no-console": "warn",
        "no-extra-boolean-cast": "off"
    },
    "globals": {
      "getApp": false,
      "Page": false,
      "wx": false,
      "App": false,
      "getCurrentPages": false,
      "Component": false
    }
};
