import { join } from 'path';

import express from 'express';

import config from './config';

import helmet from 'helmet';
import cors from 'cors';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import morgan from 'morgan';
import logger from './logger';

import dbConnection from './database';

import auth from './middleware/Auth.middleware';

import authRouter from './routers/Auth.routes';
import projectsRouter from './routers/Projects.routes';

const app = express();

app.use(morgan('combined', {
  stream: { write: (message: string) => logger.info(message) }
}));

app.use(helmet());
app.use(cors({
  origin: `http://localhost:${config.port}`
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(join('..', 'client', 'public')));

app.use('/auth', authRouter);
app.use('/api/projects', auth, projectsRouter);

async function start() {
  try {
    await dbConnection;
  } catch (err) {
    console.log(err);
  }
  app.listen(config.port, () => console.log(`Server has been starting on http://localhost:${config.port}`));
}

start();