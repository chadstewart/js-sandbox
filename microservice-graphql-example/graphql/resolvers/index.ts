const book = { title: "hello", author: "world" }

export const resolvers = {
  Query: {
    book: () => book,
  },
};