module.exports = {
  root: true,
  parser: `@typescript-eslint/parser`,
  extends: [
    `plugin:@typescript-eslint/recommended`,
    `plugin:react/recommended`,
    `prettier`,
    `plugin:prettier/recommended`,
    `plugin:import/errors`,
    `plugin:import/warnings`,
    `plugin:import/typescript`,
    `plugin:@next/next/recommended`,
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [`.ts`, `.d.ts`, `.tsx`],
    },
    react: {
      version: `detect`,
    },
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: `module`,
    jsx: true,
  },
  rules: {
    "prettier/prettier": [1, { trailingComma: `all`, endOfLine: `auto` }],
    "@next/next/no-img-element": [0],
    "@typescript-eslint/consistent-type-imports": [
      1,
      { prefer: `type-imports` },
    ],
    "@typescript-eslint/no-unused-vars": [1, { argsIgnorePattern: `^_` }],
    "@typescript-eslint/naming-convention": [
      `error`,
      {
        selector: `variableLike`,
        format: [
          `strictCamelCase`,
          `UPPER_CASE`,
          `StrictPascalCase`,
          `snake_case`,
        ],
        leadingUnderscore: `allow`,
      },
    ],
    "@typescript-eslint/explicit-function-return-type": [
      1,
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    quotes: [1, `backtick`],
    "object-shorthand": [1, `always`],
    "import/order": [
      1,
      {
        groups: [
          `builtin`,
          `external`,
          `internal`,
          `parent`,
          `sibling`,
          `index`,
        ],
        "newlines-between": `always`,
      },
    ],
    "react/prop-types": 0, // until https://github.com/yannickcr/eslint-plugin-react/issues/2654 is resolved
    "react/display-name": 0,
  },
};
