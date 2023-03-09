import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { HttpError } from "../errors/HttpError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader: string | undefined = request.headers.authorization;

  console.log("1");

  if (!authHeader) throw new HttpError("Token missing!", 401);

  console.log("1.5");

  const [, token]: string[] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "054b9ba25573c70ceeb2411294ca9b42"
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    console.log("2");

    if (!user) throw new HttpError("User does not exist!", 400);

    console.log("2.5");

    next();
  } catch (error) {
    console.log("3");

    throw new HttpError("Invalid token!", 401);
  }
}
