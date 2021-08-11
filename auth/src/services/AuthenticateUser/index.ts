import { injectable, inject, container } from 'tsyringe';
import { IUserDTO } from '../../dtos/IUserDTO';
import { UnauthorizedError } from '@sam20fonsa1098tickets/common';

import { IHashProvider } from '../../providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '../../repositories/models/IUsersRepository';

import { GenerateTokensService } from '../GenerateTokens';
import { IResponse } from './interfaces';

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private bCryptHashProvider: IHashProvider,
  ) {}

  public async execute(data: IUserDTO): Promise<IResponse> {
    const user = await this.usersRepository.findUserByEmail(data.email);
    if (!user) {
      throw new UnauthorizedError('Incorrect email/password combination');
    }
    const passwordMatched = await this.bCryptHashProvider.compareHash(
      data.password,
      user.password as string,
    );
    if (!passwordMatched) {
      throw new UnauthorizedError('Incorrect email/password combination');
    }
    const generateTokens = container.resolve(GenerateTokensService);
    const tokens = await generateTokens.execute({ 
      id: user.id.toString(), 
      email: user.email as string 
    });
    return {
      user,
      ...tokens,
    };
  }
}
