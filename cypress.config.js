const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {  
    projectId: "juu3sa",
    baseUrl: 'https://app-apimaticio-test-eus.azurewebsites.net/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
