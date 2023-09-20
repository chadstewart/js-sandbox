import { categories } from "../../models/categories";
import { customerDetails, customers } from "../../models/customers";
import { employees } from "../../models/employees";
import { orderDetails, orders } from "../../models/orders";
import { products } from "../../models/products";
import { supplier } from "../../models/suppliers";

const book = { title: "hello", author: "world" }

export const resolvers = {
  Query: {
    book: () => book,
    getOrders: (page: number) => orders(page),
    getOrderDetails: (id: number) => orderDetails(id),
    getEmployees: (page: number) => employees(page),
    getCustomers: (page: number) => customers(page),
    getCustomerDetails: (id: string) => customerDetails(id),
    getProducts: (page: number) => products(page),
    getCategories: (page: number) => categories(page),
    getSuppliers: (page: number) => supplier(page)
  },
};