/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */
import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);

    if (!user) return null;

    return user;
  }

  findByEmail(email: string): User | undefined {
    const accountFoundByEmail = this.users.find(
      (user: User) => user.email === email
    );

    if (accountFoundByEmail) {
      return accountFoundByEmail;
    }
    return null;
  }

  turnAdmin(receivedUser: User): User {
    const userWithAdmin = Object.assign(receivedUser, {
      admin: true,
    });

    const index = this.users.findIndex((user) => user.id === userWithAdmin.id);

    this.users.splice(index, 1, userWithAdmin);

    return userWithAdmin;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
