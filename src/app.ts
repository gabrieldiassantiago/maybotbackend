import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

dotenv.config();

const server = Fastify({
  logger: true, 
});

server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET!,
});

server.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

server.register(authRoutes, { prefix: '/api' });

const start = async () => {
  try {
    await server.listen({ port: 3000 });
    console.log(`Servidor rodando em http://localhost:3000`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();

export { server };
