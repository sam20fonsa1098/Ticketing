import { injectable, inject } from 'tsyringe';
import { IValidator } from 'validators/models/IValidator';

import { ICreateUserDTO } from '@dtos/ICreateUserDTO';
import { User } from '@infra/typeorm/entities/User';
import { IHashProvider } from '@providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '@repositories/models/IUsersRepository';
import { IService } from '@services/models/IService';

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export class AuthenticateUserService implements IService {
  private validators: Array<IValidator>;
  private observers: Array<IService>;

  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private bCryptHashProvider: IHashProvider,
  ) {
    this.validators = [];
    this.observers = [];
  }

  public setValidators(validators: Array<IValidator>) {
    this.validators = validators;
  }

  public setObservers(observers: Array<IService>) {
    this.observers = observers;
  }

  public async execute(data: ICreateUserDTO): Promise<IResponse> {
    const user = await this.usersRepository.findUserByEmail(data.email);
    this.validators.forEach(validator => validator.validate(user));
    await this.bCryptHashProvider.compareHash(
      data.password,
      user!.password as string,
    );
    const response = { user: user! };
    this.observers.forEach(observer => {
      Object.assign(response, { ...observer.execute(user) });
    });
    return response as IResponse;
  }
}
