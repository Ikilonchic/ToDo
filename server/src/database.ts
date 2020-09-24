import { Connection, createConnection } from 'typeorm';
import config from './config';
import logger from './logger';
import { Project } from './models/project';
import { Task } from './models/task';
import { User } from './models/user';

async function connect() : Promise<Connection> {
  const connection = await createConnection({
    type: 'postgres',
    ...config.db,
    logger: 'debug',
    logging: ['error'],
    entities: [
      User,
      Project,
      Task
    ]
  });

  logger.info(`Connected to Postgres at ${config.db.url}`);

  return connection;
};

export default connect();