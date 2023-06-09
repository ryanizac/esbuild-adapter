/** @type {import("jest").Config} */
module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
};
