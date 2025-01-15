import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom", // Jest environment for testing
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Path to Jest setup file
  moduleNameMapper: {
    // Map module aliases
    "^@/(.*)$": "<rootDir>/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Transform TypeScript files
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/constants/**",
    "!**/api/**",
    "!**/jest.config.ts",
    "!**/next.config.ts",
    "!**/tailwind.config.ts",
    "!**/pages/_app.tsx",
    "!**/pages/_document.tsx",
  ],
};

module.exports = createJestConfig(customJestConfig);
