// jest.config.js
const jestPreset = require('jest-expo/universal/jest-preset');

const PLATFORMS = [
  'iOS',
  'Android',
  // 'Web',
  // 'Node'
]

function modifyProject(project) {
  return {
    ...project,
    collectCoverageFrom: [
      "src/**/*.{ts,tsx}",
      "!**/node_modules/**",
    ],
    setupFiles: [
      "./dotenv.js",
      "./jestSetup.js",
      ...project.setupFiles
    ],
    testPathIgnorePatterns: [
      '<rootDir>/e2e/'
    ]
  };
}

module.exports = {
  ...jestPreset,
  projects: jestPreset.projects.filter(p => PLATFORMS.includes(p.displayName.name)).map(modifyProject)
};