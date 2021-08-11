import { getMongoRepository, MongoRepository, ObjectID } from 'typeorm';
import { IUserDTO } from '../../../dtos/IUserDTO';
import { IUsersRepository } from '../../../repositories/models/IUsersRepository';
import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
  private repository: MongoRepository<User>;
  constructor() {
    this.repository = getMongoRepository(User);
  }

  public createUser = async (user: IUserDTO): Promise<User> => {
    const newUser = this.repository.create(user);
    await this.repository.save(newUser);
    return newUser;
  }

  public findUserByEmail = async (email: string): Promise<User | undefined> => {
    const findUser = await this.repository.findOne({ email });
    return findUser;
  }

  public findUserById = async (id: string): Promise<User | undefined> => {
    const findUser = await this.repository.findOne(id);
    return findUser;
  }
}

export { UsersRepository };