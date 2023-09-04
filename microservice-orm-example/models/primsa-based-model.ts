import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({
  log: ['query']
});

prisma.customers.findMany();