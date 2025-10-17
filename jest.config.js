{
  "name": "jest.config.js",
  "type": "module",
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "moduleNameMapper": {
      "^@/(.*)$": "<rootDir>/src/$1"
    },
    "setupFilesAfterEnv": ["<rootDir>/jest.setup.js"]
  }
}