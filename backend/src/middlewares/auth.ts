import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import {messages} from "../config/utils/messages";
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: messages.auth.token_not_provided });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch {
    res.status(401).json({ error: messages.auth.token_invalid });
  }
};
