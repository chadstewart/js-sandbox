import express from "express";
const router = express.Router();

import { getOrders, getOrderDetails } from "../controllers/orders-controller";

router.get("/orders/:page?", getOrders);
router.get("/orders/details/:order_id?", getOrderDetails);

export default router;