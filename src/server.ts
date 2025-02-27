import fastify from 'fastify';
import { knex } from './database';

const server = fastify();

server.get('/', async () => {
  const tables = await knex('sqlite_schema').select('*');

  return tables;
});

server.listen({ port: 3000 }).then(() => {
  console.log('Server is running on port 3000');
});
