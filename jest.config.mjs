import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config = {
  testEnvironment: "jsdom",
  setupFiles: ["./tests/setup.js"],
  testPathIgnorePatterns: ["/node_modules/", "/tests/e2e/"],
};

export default createJestConfig(config);
