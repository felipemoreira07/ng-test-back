import { prisma } from "../../../../prisma/client";
import { CreateUserDto } from "./../../dtos/createUserDTO";

export class CreateUserUseCase {
  async execute({ username, password }: CreateUserDto) {
    // Verificar se o usuário já existe
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    // Criar o usuário
    const user = await prisma.user.create({
      data: {
        username,
        password,
        account: {},
        accountId: undefined,
      },
    });

    return user;
  }
}
