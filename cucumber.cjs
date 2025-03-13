module.exports = {
  default: {
    paths: ['src/tests/features/**/*.feature'],
    format: [
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html',
    ],
    formatOptions: {
      colorsEnabled: true,
      snippetInterface: 'async-await',
    },
    require: ['src/tests/step_definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
  },
}
