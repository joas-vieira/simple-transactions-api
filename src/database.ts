import { knex as Knex } from 'knex';

export const knex = Knex({
  client: 'sqlite',
  connection: {
    filename: './tmp/db.sqlite'
  },
  useNullAsDefault: true
});
