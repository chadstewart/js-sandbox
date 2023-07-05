import express from "express";
import https from "https";
import fs from "fs";
import path from "path";
import routeAuth from "./middleware/route-authz";

export const app = express();

//Initialize Request Data Type
app.use(express.json({ limit: "10mb" }));

//Initialize Middlewares
app.use(routeAuth);

//Initialize Routers
import v1Router from "./v1/routes/gateway-router";
import v1AuthRouter from "./v1/routes/authn-router";

//Use Routers
app.use("/v1/gateway", v1Router);
app.use("/v1/auth", v1AuthRouter);
app.get("/", (req, res) => res.send("Hello World!!"));