import { FastifyInstance } from 'fastify';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { knex } from '../database';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

export async function transactionsRoutes(server: FastifyInstance) {
  server.get(
    '/',
    {
      preHandler: [checkSessionIdExists]
    },
    async (request) => {
      const { sessionId } = request.cookies;

      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select();

      return { transactions };
    }
  );

  server.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists]
    },
    async (request) => {
      const getTransactionParamsSchema = z.object({
        id: z.string().uuid()
      });

      const { id } = getTransactionParamsSchema.parse(request.params);

      const { sessionId } = request.cookies;

      const transaction = await knex('transactions')
        .where({
          id,
          session_id: sessionId
        })
        .first();

      return { transaction };
    }
  );

  server.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists]
    },
    async (request) => {
      const { sessionId } = request.cookies;

      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first();

      return { summary };
    }
  );

  server.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['debit', 'credit'])
    });

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body
    );

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
    }

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : -amount,
      session_id: sessionId
    });

    reply.status(201).send();
  });
}
