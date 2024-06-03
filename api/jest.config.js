/** @type {import('ts-jest').JestConfigWithTsJest} */
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config({ path: "../.env" });

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
};
