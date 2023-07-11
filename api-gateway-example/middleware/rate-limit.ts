import { Request, Response, NextFunction } from "express";
import { redis } from "../app";

const REQUESTS_ALLOWED = 20;
const TIME_LIMIT = 60;

export default async function rateLimit (req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.slice(6) as string;

  const requests = await redis.incr(token);
  const firstRequest = requests === 1;

  if (firstRequest) redis.expire(token, TIME_LIMIT);

  const pastRateLimit = requests > REQUESTS_ALLOWED;

  if (pastRateLimit) {
    return res.status(429).json({
      status: "failed",
      error: "Rate Limit Exceeded"
    });
  }

  next();
};