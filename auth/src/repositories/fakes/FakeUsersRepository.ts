import { ICreateUserDTO } from '@dtos/ICreateUserDTO';
import { User } from '@infra/typeorm/entities/User';
import { IUsersRepository } from '@repositories/models/IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: Array<User> = [];

  public async createUser(data: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, data);
    this.users.push(user);
    return user;
  }

  public async findUserByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  public async findUserById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }
}

export { FakeUsersRepository };
