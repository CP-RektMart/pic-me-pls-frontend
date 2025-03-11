module.exports = {
  default: {
    paths: ['tests/features/**/*.feature'],
    format: [
      'progress-bar',
      'summary',
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html',
    ],
    formatOptions: {
      colorsEnabled: true,
      snippetInterface: 'async-await',
    },
    require: ['tests/step_definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
  },
}
