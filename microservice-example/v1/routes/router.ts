import express from "express";
const router = express.Router();

import getOrders from "../controllers/orders-controller";

router.get("/orders/:page?", getOrders);

export default router;