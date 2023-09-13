import https from "https";
import fs from "fs";
import path from "path";
import { ApolloServer } from "@apollo/server";

const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type Query {
    book: Book
  }
`;

const book = { title: "hello", author: "world" }

const resolvers = {
  Query: {
    book: () => book,
  },
};

export const server = new ApolloServer({
  typeDefs,
  resolvers
});