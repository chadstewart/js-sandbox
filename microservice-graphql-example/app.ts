import https from "https";
import fs from "fs";
import path from "path";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./graphql/type-defs";
import { resolvers } from "./graphql/resolvers";

export const server = new ApolloServer({
  typeDefs,
  resolvers
});