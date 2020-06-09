module.exports = {
  parser: `@typescript-eslint/parser`,
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  plugins: ["react", "@typescript-eslint", "prettier"],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      "jsx": true
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        semi: true,
        singleQuote: true,
        printWidth: 80,
      },
    ],
  },
  "overrides": [
    {
        "files": ["**/*.tsx"],
        "rules": {
            "react/prop-types": "off"
        }
    }
  ]
}
