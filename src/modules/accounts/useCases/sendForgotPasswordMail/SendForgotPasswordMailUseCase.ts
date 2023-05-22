import { randomUUID } from "node:crypto";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { HttpError } from "@shared/errors/HttpError";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokenRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new HttpError("User does not exists!");

    const token = randomUUID();

    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokenRepository.create({
      user_id: user.id,
      refresh_token: token,
      expires_date,
    });

    await this.mailProvider.sendMail(
      email,
      "Recuperação de Senha",
      `O link para o reset é ${token}`
    );
  }
}

export { SendForgotPasswordMailUseCase };
