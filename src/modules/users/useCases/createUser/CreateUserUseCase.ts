/* eslint-disable prettier/prettier */

import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const isEmailAlreadyInUse = this.usersRepository.findByEmail(email);

    if (isEmailAlreadyInUse) {
      throw new Error("Email already in use");
    }

    const user = this.usersRepository.create({
      email,
      name,
    });
    return user;
  }
}

export { CreateUserUseCase };
