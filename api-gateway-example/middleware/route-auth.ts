import { Request, Response, NextFunction } from "express";
import zod from "zod";
import checkAuthorization from "../services/authorization";

export default async function routeAuth (req: Request, res: Response, next: NextFunction) {
  const indexRoute = req.path === "/" && req.method === "GET";
  if(indexRoute) return next();

  const unauthObj = {
    data: {
      status: "unauthorized"
    }
  };

  const checkForAuthHeader = zod.object({ authorization: zod.string().startsWith("Basic ") });

  try {
    await checkForAuthHeader.parse(req.headers);
    const isAuthorized = checkAuthorization(req.headers.authorization as string);

    if (!isAuthorized) return res.status(401).json(unauthObj);

    return next();
  } catch (err) {
    return res.status(401).json(unauthObj);
  }
};