import { Request, Response, NextFunction } from "express";
import { rateLimitStore } from "../app";

const REQUESTS_ALLOWED = 20;
const TIME_LIMIT = 60000;

export default function rateLimit (req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.slice(6) as string;
  const currentTimeStamp = Date.now();

  const userIsInRLStore = rateLimitStore[token];
  
  if (!userIsInRLStore) {
    rateLimitStore[token] = {
      timeStamp: currentTimeStamp,
      totalRequests: 0
    };
  }
  
  const timeStampExceeded = rateLimitStore[token]["timeStamp"] < currentTimeStamp - TIME_LIMIT;

  if (timeStampExceeded) {
    rateLimitStore[token] = {
      timeStamp: currentTimeStamp,
      totalRequests: 0
    };
  }

  rateLimitStore[token]["totalRequests"]++;

  const pastRateLimit = rateLimitStore[token]["timeStamp"] > currentTimeStamp - TIME_LIMIT && 
                        rateLimitStore[token]["totalRequests"] >= REQUESTS_ALLOWED;

  if (pastRateLimit) {
    return res.status(429).json({
      status: "failed",
      error: "Rate Limit Exceeded"
    });
  }

  next();
};