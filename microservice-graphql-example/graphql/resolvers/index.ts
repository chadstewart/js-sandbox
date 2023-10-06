import { categories, categoriesGraphQL } from "../../models/categories";
import { customerDetails, customerDetailsGraphQL, customers, updateCustomer } from "../../models/customers";
import { createEmployee, employees, employeesFromIdGraphQL } from "../../models/employees";
import { orderDetailsGraphQL, orders, ordersGraphQL } from "../../models/orders";
import { productDetailsGraphQL, products } from "../../models/products";
import { regionsGraphQL } from "../../models/region";
import { supplier, supplierGraphQL } from "../../models/suppliers";
import { employeeTerritoriesGraphQL, territoriesGraphQL } from "../../models/territories";
import { checkResolverPerformance } from "../../util/performance-test";
import { createEmployeeZodSchema } from "../../util/schemas/employee-zod-schema";
import { updateCustomerZodSchema } from "../../util/schemas/update-customer-zod-schema";
import { ResolverContext } from "../../util/types/context-resolver-types";

interface QueryPaginationArgs {
  page: number
}

interface CustomerMutationArgs {
  id: string
  customerUserInput: typeof updateCustomerZodSchema
}

interface CreateEmployeeMutationArgs {
  createEmployeeInput: typeof createEmployeeZodSchema
}

export const resolvers = {
  Query: {
    getOrders: (_: any, args: QueryPaginationArgs, context: ResolverContext) => checkResolverPerformance(context, async () => await orders(args.page)).queryData,
    getOrderDetails: (_: any, args: QueryPaginationArgs, context: ResolverContext) => checkResolverPerformance(context, () => orderDetailsGraphQL(args.page)),
    getEmployees: (_: any, args: QueryPaginationArgs, context: ResolverContext) => checkResolverPerformance(context, async () => await employees(args.page)).queryData,
    getCustomers: (_: any, args: QueryPaginationArgs, context: ResolverContext) => checkResolverPerformance(context, async () => await customers(args.page)).queryData,
    getCustomerDetails: (_: any, args: { id: string }, context: ResolverContext) => checkResolverPerformance(context, () => customerDetails(args.id)),
    getProducts: (_: any, args: QueryPaginationArgs, context: ResolverContext) => checkResolverPerformance(context, async () => await products(args.page)).queryData,
    getCategories: (_: any, args: QueryPaginationArgs, context: ResolverContext) => checkResolverPerformance(context, async () => await categories(args.page)).queryData,
    getSuppliers: (_: any, args: QueryPaginationArgs, context: ResolverContext) => checkResolverPerformance(context, () => supplier(args.page)),
    getEmployeeTerritories: (_: any, args: QueryPaginationArgs, context: ResolverContext) => checkResolverPerformance(context, async () => await employeeTerritoriesGraphQL(args.page)).queryData
  },
  Order: {
    customer: async (parent: { customer_id: string }, context: ResolverContext) => checkResolverPerformance(context, async () => await customerDetailsGraphQL(parent.customer_id)),
    employee: async (parent: { employee_id: number }, context: ResolverContext) => checkResolverPerformance(context, async () => await employeesFromIdGraphQL(parent.employee_id))
  },
  OrderDetail: {
    order: async (parent: { order_id: number }, context: ResolverContext) => checkResolverPerformance(context, async () => await ordersGraphQL(parent.order_id)),
    product: async (parent: { product_id: number }, context: ResolverContext) => checkResolverPerformance(context, async () => await productDetailsGraphQL(parent.product_id))
  },
  EmployeeTerritory: {
    employee: async (parent: { employee_id: number }, context: ResolverContext) => checkResolverPerformance(context, async () => await employeesFromIdGraphQL(parent.employee_id)).queryData,
    territory: async (parent: { territory_id: number }, context: ResolverContext) => checkResolverPerformance(context, async () => await territoriesGraphQL(parent.territory_id)).queryData
  },
  Product: {
    supplier: async (parent: { supplier_id: number }, context: ResolverContext) => checkResolverPerformance(context, async () => await supplierGraphQL(parent.supplier_id)),
    category: async (parent: { category_id: number }, context: ResolverContext) => checkResolverPerformance(context, async () => await categoriesGraphQL(parent.category_id))
  },
  Territory: {
    region: async (parent: { region_id: number }, context: ResolverContext) => checkResolverPerformance(context, async () => await regionsGraphQL(parent.region_id))
  },
  Mutation: {
    updateCustomer: async (_: any, args: CustomerMutationArgs, context: ResolverContext) => checkResolverPerformance(context, async () => await updateCustomer(args.id, args.customerUserInput)),
    createEmployee: async (_: any, args: CreateEmployeeMutationArgs, context: ResolverContext) => checkResolverPerformance(context, async () => await createEmployee(args.createEmployeeInput))
  }
};