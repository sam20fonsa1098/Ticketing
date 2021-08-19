import { injectable, inject } from 'tsyringe';

import { User } from '@infra/typeorm/entities/User';
import { IUsersRepository } from '@repositories/models/IUsersRepository';
import { IService } from '@services/models/IService';

@injectable()
class FindUserByEmailService implements IService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findUserByEmail(email);
    return user;
  }
}

export { FindUserByEmailService };
