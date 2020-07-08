const jestPreset = require('jest-expo/universal/jest-preset');

function modifyProject(project) {
  return {
    ...project,
    testMatch: [
      "**/*.test.js",
      "**/*.test.jsx",
      "**/*.test.ts",
      "**/*.test.tsx"
    ],
    collectCoverageFrom: [
      "src/**/*.{ts,tsx}",
      "!**/node_modules/**",
    ],
    setupFiles: [
      "./dotenv.js",
      "./jestSetup.js",
      ...project.setupFiles
    ]
  };
}

// jest.config.js
module.exports = {
  ...jestPreset,
  projects: jestPreset.projects.filter(p => p.displayName.name === 'iOS').map(modifyProject)
};