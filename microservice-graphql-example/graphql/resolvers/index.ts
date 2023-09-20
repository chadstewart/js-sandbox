const book = { title: "hello", author: "world" }

export const resolvers = {
  Query: {
    book: () => book,
    getOrders: () => null,
    getOrderDetails: () => null,
    getEmployees: () => null,
    getCustomers: () => null,
    getProducts: () => null,
    getCategories: () => null,
    getSuppliers: () => null
  },
};