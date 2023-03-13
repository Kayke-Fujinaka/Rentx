import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { HttpError } from "@shared/errors/HttpError";

export async function ensureAdmin(
  request: Request,
  _: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user.isAdmin) throw new HttpError("User isn't admin!");

  return next();
}
