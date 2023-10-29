module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    "plugin:prettier/recommended",
    "next/core-web-vitals",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    project: "./tsconfig.eslint.json",
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "eslint-plugin-import",
    "eslint-plugin-prettier",
    "sort-keys-fix",
    "sort-destructure-keys",
  ],
  rules: {
    "@typescript-eslint/consistent-type-exports": 1,
    "@typescript-eslint/consistent-type-imports": 1,
    "no-useless-rename": [1],
    "object-shorthand": [1, "always"],
    "prettier/prettier": [
      1,
      {
        endOfLine: "auto",
        quoteProps: "consistent",
        trailingComma: "all",
      },
    ],
    "quotes": [1],
    "sort-destructure-keys/sort-destructure-keys": 2,
    "sort-keys-fix/sort-keys-fix": [
      2,
      "asc",
      {
        natural: true,
      },
    ],
  },
};
