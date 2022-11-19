import { prisma } from "../../../../prisma/client";
import { CreateAcountDTO } from "../../dtos/createAccountDTO";

export class CreateAccountUseCase {
  async execute({ user }: CreateAcountDTO) {
    // Verificar se user existe e se ele tem conta
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        username: user.username,
      },
    });

    if (!userAlreadyExists) {
      throw new Error("User does not exist");
    }

    if (userAlreadyExists.accountId) {
      throw new Error("User already have account");
    }

    // Criar conta
    const account = await prisma.account.create({
      data: {
        balance: 100,
        creditedTransactions: {},
        debitedTransactions: {},
        user: userAlreadyExists,
      },
    });

    return account;
  }
}
