module.exports = {
    preset: 'ts-jest', // Use ts-jest preset
    testEnvironment: 'node', // Specify the test environment
    testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore these paths
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files
    },
};
