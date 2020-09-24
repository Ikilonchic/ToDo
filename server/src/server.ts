import express from 'express';
import session from 'express-session';

import config from './config';

import helmet from 'helmet';
import cors from 'cors';

import bodyParser from 'body-parser';

import morgan from 'morgan';
import logger from './logger';

import dbConnection from './database';

import AuthRouter from './routers/auth.routes';
import ProjectRouter from './routers/project.routes';

const app = express();

app.use(morgan('combined', {
  stream: { write: (message: any) => logger.info(message) }
}));

app.use(helmet());
app.use(cors({
  origin: `http://localhost:${config.port}`
}));

app.use(session(config.session));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', AuthRouter);
app.use('/projects', ProjectRouter);

async function start() {
  try {
    await dbConnection;
  } catch (err) {
    console.log(err);
  }
  app.listen(config.port, () => console.log(`Server has been starting on http://localhost:${config.port}`));
}

start();