module.exports = {
  trailingComma: 'es5',
  semi: false,
  tabWidth: 2,
  useTabs: false,
  endOfLine: 'auto',
  printWidth: 80,
  singleQuote: true,
  jsxSingleQuote: true,
  proseWrap: 'preserve',
  arrowParens: 'always',
  importOrder: [
    '^react$',
    '<THIRD_PARTY_MODULES>',
    '@/components/(.*)$',
    '^[.]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  overrides: [
    {
      files: '*.json',
      options: {
        singleQuote: false,
      },
    },
    {
      files: '.*rc',
      options: {
        singleQuote: false,
        parser: 'json',
      },
    },
  ],
}
