import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { HttpError } from "@shared/errors/HttpError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { secret_refresh_token } = auth;

  const authHeader: string | undefined = request.headers.authorization;

  const usersTokensRepository = new UsersTokensRepository();

  if (!authHeader) throw new HttpError("Token missing!", 401);

  const [, token]: string[] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, secret_refresh_token) as IPayload;

    const user = await usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!user) throw new HttpError("User doesn't exists!", 401);

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new HttpError("Invalid token!", 401);
  }
}
