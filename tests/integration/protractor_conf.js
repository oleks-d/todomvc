//protractor_config.js
exports.config = {
  directConnect: true,
  baseUrl: 'http://localhost:8080' ,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Test framework to use. Jasmine 2 is recommended by default.
  framework: 'jasmine2',

  // Specs
  specs: ['integration_spec.js'],

  // Jasmine options
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    onComplete: null,
    isVerbose: false,
    showColors: true,
    includeStackTrace: false
  }
};
