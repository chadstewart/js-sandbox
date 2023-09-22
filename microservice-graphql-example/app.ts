import http from "http";
import fs from "fs";
import path from "path";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { typeDefs } from "./graphql/type-defs";
import { resolvers } from "./graphql/resolvers";

interface MyContext {
  token?: string;
}

export const app = express();

export const httpServer = http.createServer(app);

export const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});