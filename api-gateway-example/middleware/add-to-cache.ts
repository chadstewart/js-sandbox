import { Response, Request } from "express";
import { redis } from "../app";

const TTL = 600;

export default function addToCache (req: Request, res: Response) {
  const endpoint = req.url;
  const responseToUser = JSON.stringify(res.locals.responseToUser);

  redis.set(endpoint, responseToUser);
  redis.expire(endpoint, TTL);
  return;
};