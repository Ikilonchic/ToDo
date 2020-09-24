import path from 'path';
import { env } from 'process';
import dotenv from 'dotenv';
import { SessionOptions } from 'express-session';

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const IN_PROD = env.NODE_ENV === 'production';

function initSession() : SessionOptions {
  return {
    name: env.SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: String(env.SESS_SECRET),
    cookie: {
      maxAge: Number(env.SESS_LIFETIME),
      sameSite: true,
      secure: IN_PROD
    }
  };  
}

export default {
  port: Number(env.PORT) || 8080,
  db: {
    url: env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/web',
    synchronize: Boolean(env.FORCE_SYNC)
  },
  session: initSession()
};