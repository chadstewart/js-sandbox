import { Client } from "pg";
import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client'

dotenv.config();

export const client = new Client({
  user: `${process.env.POSTGRESQL_USER}`,
  password: `${process.env.POSTGRESQL_PASSWORD}`,
  database: `${process.env.POSTGRESQL_DATABASE}`
});

export const InitializeDB = () => {
  client.connect(error => {
    if (error) throw error;
    console.log("Connected to Database!");
  });
};

export const prisma = new PrismaClient({
  log: ['query']
});