import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@dtos/ICreateUserDTO';
import { User } from '@infra/typeorm/entities/User';
import { IUsersRepository } from '@repositories/models/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;
  constructor() {
    this.repository = getRepository(User);
  }

  public createUser = async (data: ICreateUserDTO): Promise<User> => {
    const user = this.repository.create(data);
    await this.repository.save(user);
    return user;
  };

  public findUserByEmail = async (email: string): Promise<User | undefined> => {
    const findUser = await this.repository.findOne({ email });
    return findUser;
  };

  public findUserById = async (id: string): Promise<User | undefined> => {
    const findUser = await this.repository.findOne(id);
    return findUser;
  };
}

export { UsersRepository };
