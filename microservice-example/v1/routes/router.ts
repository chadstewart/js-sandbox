import express from "express";
const router = express.Router();

import getOrders from "../controllers/orders-controller";

router.get("/order", getOrders);

export default router;