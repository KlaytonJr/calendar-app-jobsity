module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'json', 'vue'],
  moduleNameMapper: {
    '^vue$': 'vue/dist/vue.cjs.js', 
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@vue/test-utils|vue-router|vuex|@vue/vue3-jest)/'
  ],
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/App.vue',
  ],
  testMatch: [
    '<rootDir>/src/**/*.spec.js',
  ],
};