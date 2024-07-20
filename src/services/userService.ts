import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(data: { name: string; email: string; password: string }) {
  return await prisma.user.create({ data });
}

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function getAllUsers() {
  return await prisma.user.findMany();
}


export default {
  createUser,
  findUserByEmail,
  getAllUsers
};
