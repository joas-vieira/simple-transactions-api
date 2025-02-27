import { knex as knexLib, Knex } from 'knex';

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: './db/db.sqlite'
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations'
  }
};

export const knex = knexLib(config);
