import { FastifyReply, FastifyRequest } from 'fastify';
import authService from '../services/authService';
import userService from '../services/userService';
import { z } from 'zod';
import { loginSchema, userSchema } from '../schemas/userSchema';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const validatedData = userSchema.parse(request.body);

    if (await authService.emailExists(validatedData.email)) {
      reply.status(400).send({ error: 'Email já está em uso' });
      return;
    }

    const user = await authService.register(validatedData);
    reply.send(user);
  } catch (err) {
    if (err instanceof z.ZodError) {
       reply.status(400).send({
        error: 'Validation error',
        details: err.errors,  
      });
    } else {
     reply.status(500).send({error: 'Erro no servidor'})
    }
  }
}

export async function getUsers(request: FastifyRequest, reply: FastifyReply) {
  try {
    const users = await userService.getAllUsers();
    reply.send(users);
  } catch (err) {
    reply.status(500).send({ error: 'Não foi possível obter todos usuários' }); //em breve esta rota vai estar com o mid para apenas adm conseguir fazer isso
  }
}

export async function login(request: FastifyRequest, reply: FastifyReply) {
  try {
    const parsed = loginSchema.parse(request.body);
    
    const { email, password } = parsed;

    const token = await authService.login({ email, password });
    reply.send({ token });
  } catch (err) {
    if (err instanceof z.ZodError) {
    } else {

    }
  }
}
