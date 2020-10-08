import path from 'path';
import { env } from 'process';
import dotenv from 'dotenv';

// DOTENV rootDir/.env
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

export default {
  port: Number(env.PORT) || 8080,
  db: {
    url: env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/web',
    synchronize: Boolean(env.FORCE_SYNC)
  },
  cookie: {
    maxAge: Number(env.COOKIE_LIFETIME),
    secure: false,
    resave: true
  }
};