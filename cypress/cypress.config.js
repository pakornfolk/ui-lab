
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 1600,
  defaultCommandTimeout: 10000,

  // Record a video of each spec
  video: true,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
