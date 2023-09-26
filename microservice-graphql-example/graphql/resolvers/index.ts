import { categories, categoriesGraphQL } from "../../models/categories";
import { customerDetails, customerDetailsGraphQL, customers, updateCustomer } from "../../models/customers";
import { employees, employeesFromIdGraphQL } from "../../models/employees";
import { orderDetailsGraphQL, orders, ordersGraphQL } from "../../models/orders";
import { productDetailsGraphQL, products } from "../../models/products";
import { regionsGraphQL } from "../../models/region";
import { supplier, supplierGraphQL } from "../../models/suppliers";
import { employeeTerritoriesGraphQL, territoriesGraphQL } from "../../models/territories";
import { updateCustomerZodSchema } from "../../util/schemas/update-customer-zod-schema";

interface QueryPaginationArgs {
  page: number
}

interface CustomerMutationArgs {
  id: string
  reqBody: typeof updateCustomerZodSchema
}

export const resolvers = {
  Query: {
    getOrders: async (_: any, args: QueryPaginationArgs) => (await orders(args.page)).queryData,
    getOrderDetails: async (_: any, args: { page: number }) => await orderDetailsGraphQL(args.page),
    getEmployees: async (_: any, args: QueryPaginationArgs) => (await employees(args.page)).queryData,
    getCustomers: async (_: any, args: QueryPaginationArgs) => (await customers(args.page)).queryData,
    getCustomerDetails: async (_: any, args: { id: string }) => await customerDetails(args.id),
    getProducts: async (_: any, args: QueryPaginationArgs) => (await products(args.page)).queryData,
    getCategories: async (_: any, args: QueryPaginationArgs) => (await categories(args.page)).queryData,
    getSuppliers: async (_: any, args: QueryPaginationArgs) => await supplier(args.page),
    getEmployeeTerritories: async (_: any, args: QueryPaginationArgs) => (await employeeTerritoriesGraphQL(args.page)).queryData
  },
  Order: {
    customer: async (parent: { customer_id: string }) => await customerDetailsGraphQL(parent.customer_id),
    employee: async (parent: { employee_id: number }) => await employeesFromIdGraphQL(parent.employee_id)
  },
  OrderDetail: {
    order: async (parent: { order_id: number }) => await ordersGraphQL(parent.order_id),
    product: async (parent: { product_id: number }) => await productDetailsGraphQL(parent.product_id)
  },
  EmployeeTerritory: {
    employee: async (parent: { employee_id: number }) => (await employeesFromIdGraphQL(parent.employee_id)).queryData,
    territory: async (parent: { territory_id: number }) => (await territoriesGraphQL(parent.territory_id)).queryData
  },
  Product: {
    supplier: async (parent: { supplier_id: number }) => await supplierGraphQL(parent.supplier_id),
    category: async (parent: { category_id: number }) => await categoriesGraphQL(parent.category_id)
  },
  Territory: {
    region: async (parent: { region_id: number }) => await regionsGraphQL(parent.region_id)
  },
  Mutation: {
    updateCustomer: async (_: any, args: CustomerMutationArgs) => {
      try {
        updateCustomerZodSchema.parse(args.reqBody);
        return await updateCustomer(args.id, args.reqBody)
      } catch {
        return "Ohh shucks"
      }
    }
  }
};