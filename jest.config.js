module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Bỏ qua thư mục node_modules và dist khi chạy test
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverage: true, // Thu thập báo cáo độ phủ của test
  collectCoverageFrom: ['src/**/*.ts'], // Thu thập độ phủ từ các file trong thư mục src
  coverageDirectory: 'coverage', // Thư mục để lưu trữ báo cáo độ phủ
}
