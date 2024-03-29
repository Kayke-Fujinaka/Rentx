import { Request, Response } from "express";
import { container, injectable } from "tsyringe";

import { SendForgotPasswordMailUseCase } from "@modules/accounts/useCases";

@injectable()
class SendForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordMailUseCase = container.resolve(
      SendForgotPasswordMailUseCase
    );

    await sendForgotPasswordMailUseCase.execute(email);

    return response.send();
  }
}

export { SendForgotPasswordMailController };
