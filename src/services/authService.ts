import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userService from './userService';
import { z } from 'zod';

const prisma = new PrismaClient();

export async function register(data: { name: string; email: string; password: string }) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await userService.createUser({ ...data, password: hashedPassword });
  return user;
}

export async function login(data: { email: string; password: string }) {
  const user = await userService.findUserByEmail(data.email);
  if (!user || !(await bcrypt.compare(data.password, user.password))) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  return token;
}

export async function emailExists(email: string) {
  const user = await userService.findUserByEmail(email);
  return user !== null;
}

export default {
  register,
  login,
  emailExists
};
