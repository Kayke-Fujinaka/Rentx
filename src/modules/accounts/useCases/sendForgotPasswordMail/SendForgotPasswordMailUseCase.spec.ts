import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "@modules/accounts/useCases";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { HttpError } from "@shared/errors/HttpError";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "201371",
      email: "gig@naroh.vg",
      name: "Frances Adkins",
      password: "37454",
    });

    await sendForgotPasswordMailUseCase.execute("gig@naroh.vg");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send a email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("lig@ilu.io")
    ).rejects.toEqual(new HttpError("User does not exists!"));
  });

  it("should be ablet to create an users token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    await usersRepositoryInMemory.create({
      driver_license: "497602",
      email: "asgik@zek.tw",
      name: "Kevin Hale",
      password: "1398889",
    });

    await usersRepositoryInMemory.create({
      driver_license: "617151",
      email: "ra@nuwmip.mo",
      name: "Margaret Cross",
      password: "22171278",
    });

    await sendForgotPasswordMailUseCase.execute("ra@nuwmip.mo");

    expect(generateTokenMail).toBeCalled();
  });
});
