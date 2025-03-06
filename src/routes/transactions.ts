import { FastifyInstance } from 'fastify';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { knex } from '../database';

export async function transactionsRoutes(server: FastifyInstance) {
  server.get('/', async () => {
    const transactions = await knex('transactions').select();

    return { transactions };
  });

  server.get('/:id', async (request) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid()
    });

    const { id } = getTransactionParamsSchema.parse(request.params);

    const transaction = await knex('transactions').where('id', id).first();

    return { transaction };
  });

  server.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['debit', 'credit'])
    });

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body
    );

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : -amount
    });

    reply.status(201).send();
  });
}
