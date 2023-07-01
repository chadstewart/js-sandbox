import { Request, Response, NextFunction } from "express";
import zod from "zod";
import checkAuthorization from "../services/authorization";

export default async function routeAuth (req: Request, res: Response, next: NextFunction) {
  if(req.path === "/") return next();
  const zodSchema = zod.object({ Authorization: zod.string().startsWith("Basic ") });

  try{
    await zodSchema.parse(req.body);
    const isAuthorized = checkAuthorization(req.body.Authorization);

    if (!isAuthorized) return res.status(401).json({
        data: {
          status: "unauthorized"
        }
      });

    return next();
  } catch (err) {
    return res.status(401).json({
      data: {
        status: "unauthorized"
      }
    });
  }
};