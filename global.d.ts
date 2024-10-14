namespace NodeJS {
  interface ProcessEnv {
    ENABLE_EXPERIMENTAL_COREPACK: number
    APP_ENV: string;
    TURBO_TOKEN: string;
    TURBO_TEAM: string;
    VERCEL_ENV: string;
    VERCEL_GIT_PROVIDER: string;
    JWT_SECRET: string;
    PORT : number
    DATABASE_URL : string
    // DATABASE_URL = 'postgresql://postgres:dLuOzoAzJKmFPiP3@db.vzwovsbefbohhqbidpgw.supabase.co:5432/postgres?schema=public'
  }
}