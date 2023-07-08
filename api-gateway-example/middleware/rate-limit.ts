import { Request, Response, NextFunction } from "express";

export default function rateLimit (req: Request, res: Response, next: NextFunction) {
  next();
};