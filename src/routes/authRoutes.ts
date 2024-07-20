import { FastifyInstance } from 'fastify';
import { register, login, getUsers } from '../controllers/authController';

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/register', register);
  fastify.post('/login', login);
  fastify.get('/users', getUsers);
}
