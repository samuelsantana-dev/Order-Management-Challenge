import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app.error";
import { ZodError } from "zod";

export function ErrorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: err.issues[0]?.message,
    });
  }

  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    error: "Erro no servidor",
  });
}
