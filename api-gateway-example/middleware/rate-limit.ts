import { Request, Response, NextFunction } from "express";

const REQUESTS_ALLOWED = 1;
const TIME_LIMIT = 60000;

interface RateLimitStore {
  [key: string]: {
    timeStamp: number;
    totalRequests: number;
  }
}

export default function rateLimit (req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.slice(6) as string;
  const currentTimeStamp = Date.now();
  const rateLimitStore: RateLimitStore = {};

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

  const pastRateLimit = rateLimitStore[token]["totalRequests"] > REQUESTS_ALLOWED &&
                        rateLimitStore[token]["timeStamp"] > currentTimeStamp - TIME_LIMIT;

  if (pastRateLimit) {
    return res.status(429).json({
      status: "failed",
      error: "Rate Limit Exceeded"
    });
  }

  next();
};