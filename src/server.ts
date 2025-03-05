import fastify from 'fastify';
import { knex } from './database';
import { env } from './env';

const server = fastify();

server.get('/', async () => {
  const tables = await knex('sqlite_schema').select('*');

  return tables;
});

server.listen({ port: env.PORT }).then(() => {
  console.log(`Server is running on port ${env.PORT}`);
});
