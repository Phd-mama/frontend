export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./jest.setup.js'], 
  coverageDirectory: 'coverage', 
  coverageReporters: ['text', 'lcov'],  
  transform: {
    '^.+\\.tsx?$': 'ts-jest', 
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
