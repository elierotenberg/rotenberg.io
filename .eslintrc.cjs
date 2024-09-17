/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: [`@mindedtech/eslint-config/next`],
  parserOptions: {
    project: `./tsconfig.eslint.json`,
  },
  rules: {
    "@next/next/no-html-link-for-pages": 0,
    "react/prop-types": 0,
  },
};
