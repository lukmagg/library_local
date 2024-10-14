import path from 'path';
import dotenv from 'dotenv';

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, '../config/config.env') });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
  ENABLE_EXPERIMENTAL_COREPACK: number | undefined;
  APP_ENV: string | undefined;
  TURBO_TOKEN: string | undefined;
  TURBO_TEAM: string | undefined;
  VERCEL_ENV: string | undefined;
  VERCEL_GIT_PROVIDER: string | undefined;
  JWT_SECRET: string | undefined;
  PORT: number | undefined;
  DATABASE_URL: string | undefined;
}

interface Config {
  ENABLE_EXPERIMENTAL_COREPACK: number | undefined;
  APP_ENV: string | undefined;
  TURBO_TOKEN: string | undefined;
  TURBO_TEAM: string | undefined;
  VERCEL_ENV: string | undefined;
  VERCEL_GIT_PROVIDER: string | undefined;
  JWT_SECRET: string | undefined;
  PORT: number | undefined;
  DATABASE_URL: string | undefined;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    ENABLE_EXPERIMENTAL_COREPACK: process.env.ENABLE_EXPERIMENTAL_COREPACK
      ? Number(process.env.ENABLE_EXPERIMENTAL_COREPACK)
      : undefined,
    APP_ENV: process.env.APP_ENV,
    TURBO_TOKEN: process.env.TURBO_TOKEN,
    TURBO_TEAM: process.env.TURBO_TEAM,
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_GIT_PROVIDER: process.env.VERCEL_GIT_PROVIDER,
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    DATABASE_URL: process.env.DATABASE_URL,
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
