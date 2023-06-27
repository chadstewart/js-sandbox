import express from "express";
import https from "https";
import fs from "fs";
import path from "path";

export const app = express();

//Initialize Request Data Type
app.use(express.json({ limit: "10mb" }));

//Initialize Routers
import v1Router from "./v1/routes/gateway-router";

//Use Routers
app.use("/v1/gateway", v1Router);
app.get("/", (req, res) => res.send("Hello World!!"));