import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { HttpError } from "@shared/errors/HttpError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader: string | undefined = request.headers.authorization;

  if (!authHeader) throw new HttpError("Token missing!", 401);

  const [, token]: string[] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "054b9ba25573c70ceeb2411294ca9b42"
    ) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new HttpError("Invalid token!", 401);
  }
}
