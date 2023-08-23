import express from "express";
const router = express.Router();

import { getOrders, getOrderDetails } from "../controllers/orders-controller";
import { getEmployees } from "../controllers/employees-controller";
import { getEmployeesByTerritories } from "../controllers/territories-controller";

//Orders
router.get("/orders/:page?", getOrders);
router.get("/orders/details/:order_id?", getOrderDetails);

//Employees
router.get("/employees/:page?", getEmployees);

//Territories
router.get("/territories/employees/:territory_id?/:page?", getEmployeesByTerritories);

export default router;