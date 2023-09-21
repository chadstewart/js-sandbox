import { categories } from "../../models/categories";
import { customerDetails, customers } from "../../models/customers";
import { employees } from "../../models/employees";
import { orderDetailsGraphQL, orders, ordersGraphQL } from "../../models/orders";
import { products } from "../../models/products";
import { supplier } from "../../models/suppliers";

interface QueryPageArgs {
  page: number
}

export const resolvers = {
  Query: {
    getOrders: async (_: any, args: QueryPageArgs) => (await orders(args.page)).queryData,
    getOrderDetails: async (_: any, args: { page: number }) => await orderDetailsGraphQL(args.page),
    getEmployees: async (_: any, args: QueryPageArgs) => (await employees(args.page)).queryData,
    getCustomers: async (_: any, args: QueryPageArgs) => (await customers(args.page)).queryData,
    getCustomerDetails: async (_: any, args: { id: string }) => await customerDetails(args.id),
    getProducts: async (_: any, args: QueryPageArgs) => (await products(args.page)).queryData,
    getCategories: async (_: any, args: QueryPageArgs) => (await categories(args.page)).queryData,
    getSuppliers: async (_: any, args: QueryPageArgs) => await supplier(args.page)
  },
  OrderDetail: {
    order: async (parent: { order_id: number }) => await ordersGraphQL(parent.order_id)
  },
};