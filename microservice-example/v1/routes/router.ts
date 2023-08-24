import express from "express";
const router = express.Router();

import { getOrders, getOrderDetails } from "../controllers/orders-controller";
import { getEmployees } from "../controllers/employees-controller";
import { getEmployeesByTerritories } from "../controllers/territories-controller";
import { getProducts, getProductDetails } from "../controllers/products-controller";
import { getCustomerDetails, getCustomers } from "../controllers/customers-controller";

//Orders
router.get("/orders/:page?", getOrders);
router.get("/orders/details/:order_id?", getOrderDetails);

//Products
router.get("/products/:page?", getProducts);
router.get("/products/details/:product_id?", getProductDetails);

//Customers
router.get("/customers/:page?", getCustomers);
router.get("/customers/details/:customer_id?", getCustomerDetails);

//Employees
router.get("/employees/:page?", getEmployees);

//Territories
router.get("/territories/employees/:territory_id?/:page?", getEmployeesByTerritories);

export default router;