import { IUserDTO } from '../../dtos/IUserDTO';
import { User } from '../../infra/typeorm/entities/User';

export interface IUsersRepository {
  createUser(user: IUserDTO): Promise<User>;
  findUserByEmail(email: string): Promise<User | undefined>;
  findUserById(id: string): Promise<User | undefined>;
}