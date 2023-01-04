const { GoogleSocialLogin } = require("cypress-social-logins").plugins;

module.exports = {
  chromeWebSecurity: false,

  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.js",

    setupNodeEvents(on, config) {
      on("task", {
        GoogleSocialLogin: GoogleSocialLogin,
      });
    },
  },
};
