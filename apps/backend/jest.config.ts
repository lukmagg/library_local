import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    rootDir: './',
    testEnvironment: 'node',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
    },
};

export default config;
