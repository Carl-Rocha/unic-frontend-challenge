module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)", // Excluir axios do padrão de ignorar
  ],
  moduleFileExtensions: ["js", "jsx"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
