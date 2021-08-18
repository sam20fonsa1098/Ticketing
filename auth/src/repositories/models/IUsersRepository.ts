import { ICreateUserDTO } from '@dtos/ICreateUserDTO';
import { User } from '@infra/typeorm/entities/User';

export interface IUsersRepository {
  createUser(user: ICreateUserDTO): Promise<User>;
  findUserByEmail(email: string): Promise<User | undefined>;
  findUserById(id: string): Promise<User | undefined>;
}
